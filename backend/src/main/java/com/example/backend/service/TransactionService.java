package com.example.backend.service;

import com.example.backend.exception.custom.TransactionNotFoundException;
import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import com.example.backend.repository.ScheduledTransactionRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ScheduledTransactionRepository scheduledTransactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, ScheduledTransactionRepository scheduledTransactionRepository) {
        this.transactionRepository = transactionRepository;
        this.scheduledTransactionRepository = scheduledTransactionRepository;
    }

    public Transaction getTransaction(UUID id) {
        return transactionRepository.findById(id).orElseThrow(TransactionNotFoundException::new);
    }

    public void addTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public void addScheduledTransaction(ScheduledTransaction transaction) {
        scheduledTransactionRepository.save(transaction);

    }

    public List<Transaction> getAllTransactions(UUID id) {
        return  transactionRepository.findByFromAccount_IdOrToAccount_Id(id, id);
    }

    public void deleteScheduledTransaction(UUID id) {
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(id).orElseThrow(TransactionNotFoundException::new);
        scheduledTransactionRepository.delete(transaction);
    }

}
