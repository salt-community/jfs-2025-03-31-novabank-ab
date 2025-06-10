package com.example.backend.repository;

import com.example.backend.model.Transaction;
import org.springframework.data.repository.CrudRepository;

public interface ScheduledTransactionRepository extends CrudRepository<Transaction, Long> {
}
