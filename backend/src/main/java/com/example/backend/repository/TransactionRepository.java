package com.example.backend.repository;

import com.example.backend.model.Transaction;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TransactionRepository extends CrudRepository<Transaction, UUID> {
}
