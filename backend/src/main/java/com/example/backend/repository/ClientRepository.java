package com.example.backend.repository;

import com.example.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {
    Optional<Client> getClientByAccountNumber(String accountNumber);
}
