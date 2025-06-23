package com.example.backend.repository;

import com.example.backend.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, UUID> {
}
