package com.example.backend.service;

import com.example.backend.dto.ScheduledRequestDto;
import com.example.backend.dto.TransactionRequestDto;
import com.example.backend.exception.custom.*;
import com.example.backend.model.Account;
import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.TransactionStatus;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.ScheduledTransactionRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ScheduledTransactionRepository scheduledTransactionRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;

    public TransactionService(TransactionRepository transactionRepository,
                              ScheduledTransactionRepository scheduledTransactionRepository,
                              AccountRepository accountRepository, AccountService accountService) {
        this.transactionRepository = transactionRepository;
        this.scheduledTransactionRepository = scheduledTransactionRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    public Transaction getTransaction(UUID id, String userId) {
        Transaction tx = transactionRepository.findById(id).orElseThrow(TransactionNotFoundException::new);
        return authorizeTransactionAccess(tx, userId);
    }

    public void addTransaction(UUID fromAccount, TransactionRequestDto dto, String userId) {

        Account from = getActiveAccountOrThrow(fromAccount, userId,"From");
        Account to = getActiveAccountOrThrow(dto.toAccountId(), userId,"To");
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

        transactionRepository.save(transaction);
    }

    public void addScheduledTransaction(UUID fromAccount,ScheduledRequestDto dto, String userId) {
        Account from = getActiveAccountOrThrow(fromAccount, userId,"From account");
        Account to = getActiveAccountOrThrow(dto.toAccountId(), userId, "To account");
        updateBalances(from,to,dto.amount());
        ScheduledTransaction scheduled = new ScheduledTransaction(
                UUID.randomUUID(),
                from,
                to,
                dto.amount(),
                dto.scheduledDate(),
                TransactionStatus.PENDING,
                LocalDateTime.now(),
                dto.ocrNumber(),
                dto.userNote(),
                dto.description()
        );

        scheduledTransactionRepository.save(scheduled);

    }

    private Account getActiveAccountOrThrow(UUID accountId, String userId, String label) {
        Account account = accountService.getAccount(accountId, userId);

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

    public List<Transaction> getAllTransactions(UUID id, String userId) {
        return  transactionRepository.findByFromAccount_IdOrToAccount_Id(id, id);
    }

    public void deleteScheduledTransaction(UUID accountId, UUID transactionId) {
        accountRepository.findById(accountId).orElseThrow(AccountNotFoundException::new);
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(transactionId).orElseThrow(TransactionNotFoundException::new);
        scheduledTransactionRepository.delete(transaction);
    }

    public ScheduledTransaction getScheduledTransaction(UUID accountId, UUID transactionId) {
        accountRepository.findById(accountId).orElseThrow(AccountNotFoundException::new);
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(transactionId)
                .orElseThrow(TransactionNotFoundException::new);

        if (!transaction.getFromAccount().getId().equals(accountId)) {
            throw new AccessDeniedException("Transaction does not belong to this account");
        }

        return transaction;
    }

    public List<ScheduledTransaction> getScheduledTransactions(UUID accountId) {
        accountRepository.findById(accountId).orElseThrow(AccountNotFoundException::new);
       return scheduledTransactionRepository.findByFromAccount_Id(accountId);
    }

    private Transaction authorizeTransactionAccess(Transaction tx, String userId) {
        if (!isYourAccount(tx, userId)) {
            throw new UserUnauthorizedException("User not authorized to access this transaction");
        }
        return tx;
    }

    private boolean isYourAccount(Transaction tx, String userId) {
        return (tx.getFromAccount().getUser().getId().equals(userId) || tx.getToAccount().getUser().getId().equals(userId));
    }
}
