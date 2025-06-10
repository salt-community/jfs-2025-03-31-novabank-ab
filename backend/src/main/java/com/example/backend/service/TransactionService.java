package com.example.backend.service;

import com.example.backend.model.Transaction;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }


    public Transaction getTransaction() {
        return null;
    }

    public void addTransaction() {

    }

    public void addScheduledTransaction() {

    }

    public List<Transaction> getAllTransactions() {
        return null;
    }

    public void deleteScheduledTransaction() {

    }


}
