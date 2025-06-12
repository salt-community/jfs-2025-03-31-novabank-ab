package com.example.backend.service;

import com.example.backend.dto.ScheduledRequestDto;
import com.example.backend.dto.TransactionRequestDto;
import com.example.backend.exception.custom.AccessDeniedException;
import com.example.backend.exception.custom.AccountNotAllowedException;
import com.example.backend.exception.custom.AccountNotFoundException;
import com.example.backend.exception.custom.TransactionNotFoundException;
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
import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ScheduledTransactionRepository scheduledTransactionRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository,
                              ScheduledTransactionRepository scheduledTransactionRepository,
                              AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.scheduledTransactionRepository = scheduledTransactionRepository;
        this.accountRepository = accountRepository;

    }

    public Transaction getTransaction(UUID id) {
        return transactionRepository.findById(id).orElseThrow(TransactionNotFoundException::new);
    }

    public void addTransaction(UUID fromAccount, TransactionRequestDto dto) {
        Account from = getActiveAccountOrThrow(fromAccount,"From account");
        Account to = getActiveAccountOrThrow(dto.toAccountId(),"To account");
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

    public void addScheduledTransaction(UUID fromAccount,ScheduledRequestDto dto) {
        Account from = getActiveAccountOrThrow(fromAccount,"From account");
        Account to = getActiveAccountOrThrow(dto.toAccountId(),"To account");
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

    private Account getActiveAccountOrThrow(UUID accountId, String label) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(label + " not found"));

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

    public List<Transaction> getAllTransactions(UUID id) {
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

}
