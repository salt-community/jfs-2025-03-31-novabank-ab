package com.example.backend.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;


public record TransactionRequestDto(
        @NotNull UUID toAccountId,
        @NotNull
        @Positive
        double amount,
        String description,
        String userNote,
        String ocrNumber
) {}
