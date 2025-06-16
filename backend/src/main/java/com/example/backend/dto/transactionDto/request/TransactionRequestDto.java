package com.example.backend.dto.transactionDto.request;


import com.example.backend.model.enums.PaymentType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.UUID;


public record TransactionRequestDto(
        @NotNull
        UUID fromAccountId,
        UUID toAccountId,
        String recipientNumber,
        @NotNull
        PaymentType type,
        @NotNull
        LocalDate transactionDate,
        @NotNull
        @Positive
        double amount,
        @NotNull
        String description,
        String userNote,
        @NotNull
        String ocrNumber
) {}
