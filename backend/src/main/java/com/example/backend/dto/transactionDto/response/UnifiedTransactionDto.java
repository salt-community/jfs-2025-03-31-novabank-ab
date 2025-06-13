package com.example.backend.dto.transactionDto.response;

import com.example.backend.model.enums.TransactionStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record UnifiedTransactionDto(
        UUID fromAccountId,
        UUID toAccountId,
        LocalDateTime date,
        double amount,
        String description,
        String userNote,
        String ocrNumber,
        String type,
        TransactionStatus status
) {}
