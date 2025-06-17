package com.example.backend.service;

import com.example.backend.dto.transactionDto.response.CombinedTransactionResponseDto;
import com.example.backend.dto.transactionDto.request.TransactionRequestDto;
import com.example.backend.dto.transactionDto.response.UnifiedTransactionResponseDto;
import com.example.backend.exception.custom.*;
import com.example.backend.model.Account;
import com.example.backend.model.Client;
import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.PaymentType;
import com.example.backend.model.enums.TransactionStatus;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.ScheduledTransactionRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

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

    public void addTransaction(TransactionRequestDto dto, String userId) {
        TransactionData data = prepareTransactionData(dto, userId);
        boolean isScheduled = dto.transactionDate().isAfter(LocalDate.now(ZoneOffset.UTC));
        processTransaction(dto, data, isScheduled);
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

        } else {
            if (dto.recipientNumber() == null || dto.recipientNumber().isBlank()) {
                throw new IllegalArgumentException("recipientNumber is required for external payment");
            }
            recipientNumber = dto.recipientNumber();
        }

        return new TransactionData(from, to, recipientNumber);
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

    public CombinedTransactionResponseDto getAllTransactionsByAccount(UUID accountId, String userId) {
        Account account = accountService.getAccount(accountId, userId);
        List<Transaction> transactions = transactionRepository.findByFromAccount_IdOrToAccount_Id(account.getId(), account.getId());
        List<ScheduledTransaction> scheduledTransactions = scheduledTransactionRepository.findByFromAccount_Id(account.getId());
        return new CombinedTransactionResponseDto(transactions, scheduledTransactions);
    }

    public void deleteScheduledTransaction( UUID transactionId, String userId) {
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(transactionId).orElseThrow(TransactionNotFoundException::new);
        if (!Objects.equals(transaction.getFromAccount().getUser().getId(), userId)) {
            throw new UserUnauthorizedException("User not authorized to delete this scheduled transaction");
        }
        transaction.setStatus(TransactionStatus.CANCELLED);
        scheduledTransactionRepository.save(transaction);
    }

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

    public List<Transaction> getTransactionsByUser(String userId) {
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        return accounts.stream()
                .map(account -> transactionRepository.findByFromAccount_IdOrToAccount_Id(account.getId(), account.getId()))
                .flatMap(List::stream)
                .toList();
    }

    private record TransactionData(Account from, Account to, String recipientNumber) {}

    public List<UnifiedTransactionResponseDto> getAllTransactionHistory() {
        return transactionRepository.findAll().stream()
                .map(tx -> new UnifiedTransactionResponseDto(
                        tx.getId(),
                        tx.getFromAccount().getId(),
                        tx.getToAccount() != null ? tx.getToAccount().getId() : null,
                        tx.getCreatedAt(),
                        tx.getAmount(),
                        tx.getDescription(),
                        tx.getUserNote(),
                        tx.getOcrNumber(),
                        "COMPLETED",
                        null
                ))
                .toList();
    }
}
