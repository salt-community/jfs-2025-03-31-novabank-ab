package com.example.backend.service;

import com.example.backend.dto.transactionDto.request.ClientTransactionRequestDto;
import com.example.backend.dto.transactionDto.request.TransactionRequestDto;
import com.example.backend.dto.transactionDto.response.UnifiedTransactionResponseDto;
import com.example.backend.exception.custom.*;
import com.example.backend.model.*;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.PaymentType;
import com.example.backend.model.enums.TransactionStatus;
import com.example.backend.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ScheduledTransactionRepository scheduledTransactionRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final ClientRepository clientRepository;
    private final ClientTransactionRepository clientTransactionRepository;
    private final ClientScheduledTransactionRepository clientScheduledTransactionRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              ScheduledTransactionRepository scheduledTransactionRepository,
                              AccountRepository accountRepository,
                              AccountService accountService,
                              ClientRepository clientRepository,
                              ClientTransactionRepository clientTransactionRepository,
                              ClientScheduledTransactionRepository clientScheduledTransactionRepository
    ) {
        this.transactionRepository = transactionRepository;
        this.scheduledTransactionRepository = scheduledTransactionRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
        this.clientRepository = clientRepository;
        this.clientTransactionRepository = clientTransactionRepository;
        this.clientScheduledTransactionRepository = clientScheduledTransactionRepository;
    }

    @Transactional
    public void addTransaction(TransactionRequestDto dto, String userId) {
        TransactionData data = prepareTransactionData(dto, userId);
        boolean isScheduled = dto.transactionDate().isAfter(LocalDate.now(ZoneOffset.UTC));
        processTransaction(dto, data, isScheduled);
    }

    public UnifiedTransactionResponseDto getTransaction(UUID transactionId, String userId) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            Transaction transaction = authorizeTransactionAccess(transactionOptional.get(), userId);
            return UnifiedTransactionResponseDto.fromTransaction(transaction);
        }

        Optional<ScheduledTransaction> scheduledTransactionOptional = scheduledTransactionRepository.findById(transactionId);
        if (scheduledTransactionOptional.isPresent()) {
            ScheduledTransaction scheduledTransaction = scheduledTransactionOptional.get();
            if (!Objects.equals(scheduledTransaction.getFromAccount().getUser().getId(), userId)) {
                throw new UserUnauthorizedException("User not authorized to access this transaction");
            }
            return UnifiedTransactionResponseDto.fromScheduledTransaction(scheduledTransaction);
        }

        throw new TransactionNotFoundException();
    }

    public List<UnifiedTransactionResponseDto> getAllTransactionsByAccount(UUID accountId, String userId) {
        Account account = accountService.getAccount(accountId, userId);
        List<Transaction> transactions = transactionRepository.findByFromAccount_IdOrToAccount_Id(account.getId(), account.getId());
        List<ScheduledTransaction> scheduledTransactions = scheduledTransactionRepository.findByFromAccount_Id(account.getId());

        List<UnifiedTransactionResponseDto> unifiedTransactions = new ArrayList<>();
        transactions.forEach(t -> unifiedTransactions.add(UnifiedTransactionResponseDto.fromTransaction(t)));
        scheduledTransactions.forEach(st -> unifiedTransactions.add(UnifiedTransactionResponseDto.fromScheduledTransaction(st)));

        unifiedTransactions.sort(
                Comparator
                        .comparing((UnifiedTransactionResponseDto dto) -> dto.status() == null)
                        .thenComparing(UnifiedTransactionResponseDto::date, Comparator.reverseOrder())
        );

        return unifiedTransactions;
    }

    public void deleteScheduledTransaction( UUID transactionId, String userId) {
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(transactionId).orElseThrow(TransactionNotFoundException::new);
        if (!Objects.equals(transaction.getFromAccount().getUser().getId(), userId)) {
            throw new UserUnauthorizedException("User not authorized to delete this scheduled transaction");
        }
        transaction.setStatus(TransactionStatus.CANCELLED);
        scheduledTransactionRepository.save(transaction);
    }

    @Scheduled(cron = "0 0 9 * * *", zone = "Europe/Stockholm")
    @Transactional
    public void processScheduledTransactions() {
        LocalDateTime now = LocalDateTime.now();
        List<ScheduledTransaction> scheduledTransactions = scheduledTransactionRepository.findByScheduledDateBeforeAndStatus(now, TransactionStatus.PENDING);

        for (ScheduledTransaction scheduledTransaction : scheduledTransactions) {
            Account from = accountRepository.findByAccountNumber(scheduledTransaction.getFromAccount().getAccountNumber())
                    .orElseThrow(AccountNotFoundException::new);

            Account to = null;
            if (scheduledTransaction.getType() == PaymentType.INTERNAL_TRANSFER && scheduledTransaction.getToAccount() != null) {
                to = accountRepository.findByAccountNumber(scheduledTransaction.getToAccount().getAccountNumber())
                        .orElseThrow(AccountNotFoundException::new);
            }

            if (!accountIsActive(from) || (to != null && !accountIsActive(to))) {
                scheduledTransaction.setStatus(TransactionStatus.FAILED);
                continue;
            }

            if (from.getBalance() < scheduledTransaction.getAmount()) {
                scheduledTransaction.setStatus(TransactionStatus.FAILED);
                continue;
            }

            updateBalances(from, to, scheduledTransaction.getAmount());
            Transaction transaction = new Transaction(
                    null,
                    from,
                    to,
                    scheduledTransaction.getRecipientNumber(),
                    scheduledTransaction.getType(),
                    now,
                    scheduledTransaction.getAmount(),
                    scheduledTransaction.getDescription(),
                    scheduledTransaction.getUserNote(),
                    scheduledTransaction.getOcrNumber()
            );
            transactionRepository.save(transaction);
            scheduledTransaction.setStatus(TransactionStatus.EXECUTED);
        }

        scheduledTransactionRepository.saveAll(scheduledTransactions);
    }

    public Page<UnifiedTransactionResponseDto> getTransactionsByUser(String userId, Pageable pageable) {
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        List<UUID> accountIds = accounts.stream().map(Account::getId).toList();
        Page<Transaction> transactions = transactionRepository
                .findByFromAccount_IdInOrToAccount_IdIn(accountIds, accountIds, pageable);
        return transactions.map(UnifiedTransactionResponseDto::fromTransaction);
    }

    public Page<UnifiedTransactionResponseDto> getAllTransactionHistory(Pageable pageable) {
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        return transactions.map(UnifiedTransactionResponseDto::fromTransaction);
    }

    private record TransactionData(Account from, Account to, String recipientNumber) {}

    private boolean accountIsActive(Account account) {
        return account.getStatus() == AccountStatus.ACTIVE;
    }

    private void updateBalances(Account from, Account to, double amount) {
        from.setBalance(from.getBalance() - amount);
        if (to != null) {
            to.setBalance(to.getBalance() + amount);
            accountRepository.save(to);
        }
        accountRepository.save(from);
    }


    private Transaction authorizeTransactionAccess(Transaction tx, String userId) {
        if (!isTransactionAccessibleByUser(tx, userId)) {
            throw new UserUnauthorizedException("User not authorized to access this transaction");
        }
        return tx;
    }

    private boolean isTransactionAccessibleByUser(Transaction tx, String userId) {
        return Objects.equals(tx.getFromAccount().getUser().getId(), userId)
                || (tx.getToAccount() != null && Objects.equals(tx.getToAccount().getUser().getId(), userId));
    }
    private void processTransaction(TransactionRequestDto dto, TransactionData data, boolean isScheduled) {
        if (isScheduled) {
            ScheduledTransaction scheduled = new ScheduledTransaction(
                    null,
                    data.from(),
                    data.to(),
                    data.recipientNumber(),
                    dto.type(),
                    dto.amount(),
                    dto.transactionDate().atStartOfDay(),
                    TransactionStatus.PENDING,
                    LocalDateTime.now(),
                    dto.ocrNumber(),
                    dto.userNote(),
                    dto.description()
            );
            scheduledTransactionRepository.save(scheduled);
        } else {
            if (data.from().getBalance() < dto.amount()) {
                throw new InsufficientFundsException("Not enough balance");
            }
            updateBalances(data.from(), data.to(), dto.amount());

            Transaction transaction = new Transaction(
                    null,
                    data.from(),
                    data.to(),
                    data.recipientNumber(),
                    dto.type(),
                    LocalDateTime.now(),
                    dto.amount(),
                    dto.description(),
                    dto.userNote(),
                    dto.ocrNumber()
            );
            transactionRepository.save(transaction);
        }
    }
    private TransactionData prepareTransactionData(TransactionRequestDto dto, String userId) {
        Account from = accountRepository.findByAccountNumber(dto.fromAccountNo())
                .orElseThrow(AccountNotFoundException::new);

        if (!Objects.equals(from.getUser().getId(), userId)) {
            throw new UserUnauthorizedException("User not connected to account");
        }

        if (!accountIsActive(from)) {
            throw new AccountNotAllowedException("From account is not active.");
        }

        Account to = null;
        String recipientNumber = null;

        if (dto.type() == PaymentType.INTERNAL_TRANSFER) {
            if (dto.toAccountNo() == null) {
                throw new AccountNotFoundException("To account not found");
            }
            to = accountRepository.findByAccountNumber(dto.toAccountNo())
                    .orElseThrow(AccountNotFoundException::new);

            if (!accountIsActive(to)) {
                throw new AccountNotAllowedException("To account is not active.");
            }

        }
        if(dto.type() == PaymentType.BANKGIRO || dto.type() ==PaymentType.PLUSGIRO) {
            if (dto.toAccountNo() == null) {
                throw new AccountNotFoundException("To account not found");
            }
            recipientNumber = dto.toAccountNo();
        }

        return new TransactionData(from, to, recipientNumber);
    }

    public List<ClientTransaction> getAllClientTransactionsByAccount(UUID accountId, String userId) {
        Optional<Account> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isEmpty()) throw new AccountNotFoundException();
        Account account = optionalAccount.get();
        if (!Objects.equals(account.getUser().getId(), userId)) throw new UserUnauthorizedException("User not authorized to access this clients transactions");
        return clientTransactionRepository.findAllByFromAccount(account);
    }

    public List<ClientScheduledTransaction> getAllClientScheduledTransactionsByAccount(UUID accountId, String userId) {
        Optional<Account> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isEmpty()) throw new AccountNotFoundException();
        Account account = optionalAccount.get();
        if (!Objects.equals(account.getUser().getId(), userId)) throw new UserUnauthorizedException("User not authorized to access this clients scheduled transactions");
        return clientScheduledTransactionRepository.findAllByFromAccount(account);
    }

//    public Client getClient(UUID clientId) {
//        Optional<Client> client = clientRepository.findById(clientId);
//        if (client.isEmpty()) throw new ClientNotFoundException();
//        return client.get();
//    }

    public Client getClientByAccountNo(String accountNo) {
        Optional<Client> client = clientRepository.getClientByAccountNumber(accountNo);
        if (client.isEmpty()) throw new ClientNotFoundException();
        return client.get();
    }

    @Transactional
    public void addClientTransaction(ClientTransactionRequestDto dto, String userId) {
        Optional<Account> accountOptional = accountRepository.findByAccountNumber(dto.fromAccountNo());
        if (accountOptional.isEmpty()) throw new AccountNotFoundException();
        User user = accountOptional.get().getUser();
        if (!user.getId().equals(userId)) throw new UserUnauthorizedException("User not authorized to add transaction to this client");

        Client client;
        try {
            client = getClientByAccountNo(dto.toClientNo());
        } catch (ClientNotFoundException e) {
            client = new Client();
            client.setAccountNumber(dto.toClientNo());
            clientRepository.save(client);
        }

        if (dto.transactionDate().equals(LocalDate.now())) {
            ClientTransaction clientTransaction = dto.toClientTransaction(accountOptional.get(), client);;
            clientTransactionRepository.save(clientTransaction);
        } else {
            ClientScheduledTransaction clientScheduledTransaction = dto.toClientScheduledTransaction(accountOptional.get(), client);
            clientScheduledTransactionRepository.save(clientScheduledTransaction);
        }
    }
}
