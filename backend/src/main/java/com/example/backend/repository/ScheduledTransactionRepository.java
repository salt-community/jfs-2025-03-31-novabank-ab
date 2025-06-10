package com.example.backend.repository;

import com.example.backend.model.PlaceHolderScheduledTransaction;
import org.springframework.data.repository.CrudRepository;

public interface ScheduledTransactionRepository extends CrudRepository<PlaceHolderScheduledTransaction, Long> {
}
