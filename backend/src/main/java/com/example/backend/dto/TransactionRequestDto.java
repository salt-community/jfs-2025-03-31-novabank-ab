package com.example.backend.dto;


import jakarta.validation.constraints.NotNull;
import java.util.UUID;


public record TransactionRequestDto(
        @NotNull UUID fromAccountId,
        @NotNull UUID toAccountId,
        @NotNull double amount,
        String description,
        String ocrNumber,
        String userNote
) {}
