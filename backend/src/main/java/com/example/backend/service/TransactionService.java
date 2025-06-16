package com.example.backend.service;

import com.example.backend.dto.transactionDto.response.CombinedTransactionResponseDto;
import com.example.backend.dto.transactionDto.request.TransactionRequestDto;
import com.example.backend.dto.transactionDto.response.UnifiedTransactionDto;
import com.example.backend.exception.custom.*;
import com.example.backend.model.Account;
import com.example.backend.model.Client;
import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.TransactionStatus;
import com.example.backend.repository.*;
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

    public UnifiedTransactionDto getTransaction(UUID transactionId, String userId) {
        String transactionType = "COMPLETED";
        String scheduledTransactionType = "SCHEDULED";
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            Transaction transaction = authorizeTransactionAccess(transactionOptional.get(), userId);
            return new UnifiedTransactionDto(
                    transaction.getId(),
                    transaction.getFromAccount().getId(),
                    transaction.getToAccount().getId(),
                    transaction.getCreatedAt(),
                    transaction.getAmount(),
                    transaction.getDescription(),
                    transaction.getUserNote(),
                    transaction.getOcrNumber(),
                    transactionType,
                    null
            );
        }

        Optional<ScheduledTransaction> scheduledTransactionOptional = scheduledTransactionRepository.findById(transactionId);
        if (scheduledTransactionOptional.isPresent()) {
            ScheduledTransaction scheduledTransaction = scheduledTransactionOptional.get();
            if (!Objects.equals(scheduledTransaction.getFromAccount().getUser().getId(), userId)) {
                throw new UserUnauthorizedException("User not authorized to access this transaction");
            }
            return new UnifiedTransactionDto(
                    scheduledTransaction.getId(),
                    scheduledTransaction.getFromAccount().getId(),
                    scheduledTransaction.getToAccount().getId(),
                    scheduledTransaction.getScheduledDate(),
                    scheduledTransaction.getAmount(),
                    scheduledTransaction.getDescription(),
                    scheduledTransaction.getUserNote(),
                    scheduledTransaction.getOcrNumber(),
                    scheduledTransactionType,
                    scheduledTransaction.getStatus()
            );
        }

        throw new TransactionNotFoundException();
    }

    public void addTransaction(TransactionRequestDto dto, String userId) {
        LocalDate today = LocalDate.now(ZoneOffset.UTC);
        if(dto.transactionDate().isAfter(today)) {
            addScheduledTransaction(dto,userId);
            return;
        }

        Account from = getActiveAccountOrThrow(dto.fromAccountId(),"From");
        Account to = getActiveAccountOrThrow(dto.toAccountId(),"To");
        updateBalances(from,to,dto.amount());

        Transaction transaction = new Transaction(
                UUID.randomUUID(),
                from,
                to,
                LocalDateTime.now(),
                dto.amount(),
                dto.description(),
                dto.userNote(),
                dto.ocrNumber()
        );

        transactionRepository.save(authorizeTransactionAccess(transaction, userId));
    }

    private void addScheduledTransaction(TransactionRequestDto dto, String userId) {
        Account from = getActiveAccountOrThrow(dto.fromAccountId(),"From account");
        Account to = getActiveAccountOrThrow(dto.toAccountId(), "To account");
        ScheduledTransaction scheduled = new ScheduledTransaction(
                null,
                from,
                to,
                dto.amount(),
                dto.transactionDate().atStartOfDay(),
                TransactionStatus.PENDING,
                LocalDateTime.now(),
                dto.ocrNumber(),
                dto.userNote(),
                dto.description()
        );

        scheduledTransactionRepository.save(scheduled);

    }

    private Account getActiveAccountOrThrow(UUID accountId, String label) {
        Account account = accountRepository.findById(accountId).orElseThrow(AccountNotFoundException::new);
        if (account.getStatus() != AccountStatus.ACTIVE) {
            throw new AccountNotAllowedException(label + " is not active");
        }
        return account;
    }

    private void updateBalances(Account from, Account to, double amount) {
        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);
        accountRepository.save(from);
        accountRepository.save(to);
    }

    public CombinedTransactionResponseDto getAllTransactions(UUID accountId, String userId) {
        Account account = accountService.getAccount(accountId, userId);
        List<Transaction> transactions = transactionRepository.findByFromAccount_IdOrToAccount_Id(account.getId(), account.getId());
        List<ScheduledTransaction> scheduledTransactions = scheduledTransactionRepository.findByFromAccount_Id(account.getId());
        return new CombinedTransactionResponseDto(transactions, scheduledTransactions);
    }

    public void deleteScheduledTransaction(UUID accountId, UUID transactionId, String userId) {
        accountRepository.findById(accountId).orElseThrow(AccountNotFoundException::new);
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
            Account from = getActiveAccountOrThrow(scheduledTransaction.getFromAccount().getId(), "From account");
            Account to = getActiveAccountOrThrow(scheduledTransaction.getToAccount().getId(), "To account");

            if(from.getBalance() < scheduledTransaction.getAmount()) {
                scheduledTransaction.setStatus(TransactionStatus.FAILED);
                continue;
            }

            updateBalances(from,to,scheduledTransaction.getAmount());
            Transaction transaction = new Transaction(
                    null,
                    from,
                    to,
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
                || Objects.equals(tx.getToAccount().getUser().getId(), userId);
    }

    /* public ScheduledTransaction getScheduledTransaction(UUID accountId, UUID transactionId, String userId) {
        Account account = accountService.getAccount(accountId, userId);
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(transactionId)
                .orElseThrow(TransactionNotFoundException::new);

        if (!transaction.getFromAccount().getId().equals(account.getId())) {
            throw new AccessDeniedException("Transaction does not belong to this account");
        }

        return transaction;
    }*/

   /* public List<ScheduledTransaction> getScheduledTransactions(UUID accountId) {
        accountRepository.findById(accountId).orElseThrow(AccountNotFoundException::new);
       return scheduledTransactionRepository.findByFromAccount_Id(accountId);
    }*/
}
