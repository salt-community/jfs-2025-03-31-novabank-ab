package com.example.backend.repository;

import com.example.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByFromAccount_IdOrToAccount_Id(UUID fromAccount, UUID toAccount);
}
