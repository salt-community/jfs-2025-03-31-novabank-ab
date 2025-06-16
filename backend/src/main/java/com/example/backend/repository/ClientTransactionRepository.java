package com.example.backend.repository;

import com.example.backend.model.ClientTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClientTransactionRepository extends JpaRepository<ClientTransaction, UUID> {}
