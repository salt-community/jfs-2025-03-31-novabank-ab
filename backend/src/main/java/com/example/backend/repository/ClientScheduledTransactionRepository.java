package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.ClientScheduledTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ClientScheduledTransactionRepository extends JpaRepository<ClientScheduledTransaction, UUID> {
    List<ClientScheduledTransaction> findAllByFromAccount(Account fromAccount);
}
