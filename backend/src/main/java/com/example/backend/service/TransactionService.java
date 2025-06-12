package com.example.backend.service;

import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import com.example.backend.repository.ScheduledTransactionRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        return transactionRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    public void addTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public void addScheduledTransaction(ScheduledTransaction transaction) {
        scheduledTransactionRepository.save(transaction);

    }

    public List<Transaction> getAllTransactions(UUID id) {

        Iterable<Transaction> transactions = transactionRepository.findAll();


        return (List<Transaction>) transactionRepository.findAll();
    }

    public void deleteScheduledTransaction(UUID id) {
        scheduledTransactionRepository.deleteById(id);
    }

}
