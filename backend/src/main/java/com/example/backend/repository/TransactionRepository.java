package com.example.backend.repository;

import com.example.backend.model.PlaceHolderTransaction;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<PlaceHolderTransaction, Long> {
}
