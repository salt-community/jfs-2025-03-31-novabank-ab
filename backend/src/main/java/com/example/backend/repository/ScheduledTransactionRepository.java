package com.example.backend.repository;

import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ScheduledTransactionRepository extends JpaRepository<ScheduledTransaction, UUID> {
    List<ScheduledTransaction> findByFromAccount_Id(UUID id);
}
