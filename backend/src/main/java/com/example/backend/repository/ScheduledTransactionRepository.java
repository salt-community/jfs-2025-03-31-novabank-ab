package com.example.backend.repository;

import com.example.backend.model.ScheduledTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ScheduledTransactionRepository extends JpaRepository<ScheduledTransaction, UUID> {
}
