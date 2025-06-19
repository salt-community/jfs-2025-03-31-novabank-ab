package com.example.backend.dto.transactionDto.response;

import com.example.backend.model.ClientScheduledTransaction;
import com.example.backend.model.enums.TransactionStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record ClientScheduledTransactionResponseDto(
    UUID clientTransactionId,
    UUID fromAccountId,
    UUID toClientId,
    String recipientNumber,
    String type,
    LocalDateTime date,
    double amount,
    String description,
    String userNote,
    String ocrNumber,
    TransactionStatus status
) {
    public static ClientScheduledTransactionResponseDto fromClientScheduledTransaction(ClientScheduledTransaction clientScheduledTransaction) {
        return new ClientScheduledTransactionResponseDto(
            clientScheduledTransaction.getId(),
            clientScheduledTransaction.getFromAccount().getId(),
            clientScheduledTransaction.getToClient().getId(),
            clientScheduledTransaction.getToClient().getAccountNumber(),
            clientScheduledTransaction.getType().name(),
            clientScheduledTransaction.getCreatedAt(),
            clientScheduledTransaction.getAmount(),
            clientScheduledTransaction.getDescription(),
            clientScheduledTransaction.getUserNote(),
            clientScheduledTransaction.getOcrNumber(),
            clientScheduledTransaction.getStatus()
        );
    }
}
