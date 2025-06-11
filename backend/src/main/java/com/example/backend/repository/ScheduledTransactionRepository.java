package com.example.backend.repository;

import com.example.backend.model.ScheduledTransaction;
import org.springframework.data.repository.CrudRepository;
import java.util.UUID;

public interface ScheduledTransactionRepository extends CrudRepository<ScheduledTransaction, UUID> {
}
