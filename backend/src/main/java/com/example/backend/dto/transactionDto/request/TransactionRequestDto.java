package com.example.backend.dto.transactionDto.request;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.UUID;


public record TransactionRequestDto(
        @NotNull
        UUID fromAccountId,
        @NotNull
        UUID toAccountId,
        @NotNull
        LocalDate transactionDate,
        @NotNull
        @Positive
        double amount,
        @NotNull
        String description,
        @NotNull
        String userNote,
        @NotNull
        String ocrNumber
) {}
