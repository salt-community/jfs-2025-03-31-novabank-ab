package com.example.backend.repository;

import com.example.backend.model.ClientScheduledTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClientScheduledTransactionRepository extends JpaRepository<ClientScheduledTransaction, UUID> {}
