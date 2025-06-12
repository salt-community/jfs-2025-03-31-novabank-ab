package com.example.backend.service;

import com.example.backend.dto.ScheduledRequestDto;
import com.example.backend.dto.TransactionRequestDto;
import com.example.backend.exception.custom.AccountNotFoundException;
import com.example.backend.exception.custom.TransactionNotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
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
    public TransactionService(TransactionRepository transactionRepository, ScheduledTransactionRepository scheduledTransactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.scheduledTransactionRepository = scheduledTransactionRepository;
        this.accountRepository = accountRepository;
    }

    public Transaction getTransaction(UUID id) {
        return transactionRepository.findById(id).orElseThrow(TransactionNotFoundException::new);
    }

    public void addTransaction(TransactionRequestDto dto) {
        Account from = accountRepository.findById(dto.fromAccountId())
                .orElseThrow(AccountNotFoundException::new);
        Account to = accountRepository.findById(dto.toAccountId())
                .orElseThrow(AccountNotFoundException::new);

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

    public void addScheduledTransaction(ScheduledRequestDto dto) {
        Account from = accountRepository.findById(dto.fromAccountId())
                .orElseThrow(AccountNotFoundException::new);
        Account to = accountRepository.findById(dto.toAccountId())
                .orElseThrow(AccountNotFoundException::new);

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

    public List<Transaction> getAllTransactions(UUID id) {
        return  transactionRepository.findByFromAccount_IdOrToAccount_Id(id, id);
    }

    public void deleteScheduledTransaction(UUID id) {
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(id).orElseThrow(TransactionNotFoundException::new);
        scheduledTransactionRepository.delete(transaction);
    }

}
