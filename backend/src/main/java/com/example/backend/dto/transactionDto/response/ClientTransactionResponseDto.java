package com.example.backend.dto.transactionDto.response;

import com.example.backend.model.ClientTransaction;
import com.example.backend.model.enums.TransactionStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record ClientTransactionResponseDto(
    UUID clientTransactionId,
    UUID fromAccountId,
    UUID toClientId,
    String type,
    String recipientNumber,
    LocalDateTime date,
    double amount,
    String description,
    String userNote,
    String ocrNumber
) {

    public static ClientTransactionResponseDto fromClientTransaction(ClientTransaction clientTransaction) {
        return new ClientTransactionResponseDto(
            clientTransaction.getId(),
            clientTransaction.getFromAccount().getId(),
            clientTransaction.getToClient().getId(),
            clientTransaction.getToClient().getAccountNumber(),
            clientTransaction.getType().name(),
            clientTransaction.getCreatedAt(),
            clientTransaction.getAmount(),
            clientTransaction.getDescription(),
            clientTransaction.getUserNote(),
            clientTransaction.getOcrNumber()
        );
    }
}
