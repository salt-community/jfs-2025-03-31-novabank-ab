package com.example.backend.dto.transactionDto.response;

import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import com.example.backend.model.enums.TransactionStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record UnifiedTransactionResponseDto(
        UUID transactionId,
        UUID fromAccountId,
        UUID toAccountId,
        LocalDateTime date,
        double amount,
        String description,
        String userNote,
        String ocrNumber,
        String type,
        TransactionStatus status,
        String category
) {
    public static UnifiedTransactionResponseDto fromTransaction(Transaction transaction) {
        return new UnifiedTransactionResponseDto(
                transaction.getId(),
                transaction.getFromAccount().getId(),
                transaction.getToAccount() != null ? transaction.getToAccount().getId() : null,
                transaction.getCreatedAt(),
                transaction.getAmount(),
                transaction.getDescription(),
                transaction.getUserNote(),
                transaction.getOcrNumber(),
                transaction.getType().name(),
                null,
                transaction.getCategory()
        );
    }

    public static UnifiedTransactionResponseDto fromScheduledTransaction(ScheduledTransaction scheduledTransaction) {
        return new UnifiedTransactionResponseDto(
                scheduledTransaction.getId(),
                scheduledTransaction.getFromAccount().getId(),
                scheduledTransaction.getToAccount() != null ? scheduledTransaction.getToAccount().getId() : null,
                scheduledTransaction.getCreatedAt(),
                scheduledTransaction.getAmount(),
                scheduledTransaction.getDescription(),
                scheduledTransaction.getUserNote(),
                scheduledTransaction.getOcrNumber(),
                scheduledTransaction.getType().name(),
                scheduledTransaction.getStatus(),
                scheduledTransaction.getCategory()
        );
    }
}
