package com.example.backend.dto.transactionDto.response;

import com.example.backend.model.ClientScheduledTransaction;
import com.example.backend.model.ClientTransaction;

import java.util.List;

public record CombinedClientTransactionResponseDto(
    List<ClientTransactionResponseDto> transactions,
    List<ClientScheduledTransactionResponseDto> scheduledTransactions
) {
    public static CombinedClientTransactionResponseDto fromLists(
        List<ClientTransaction> transactions,
        List<ClientScheduledTransaction> scheduledTransactions
    ) {
        List<ClientTransactionResponseDto> transactionDtos = transactions.stream()
            .map(ClientTransactionResponseDto::fromClientTransaction).
            toList();
        List<ClientScheduledTransactionResponseDto> scheduledTransactionDtos = scheduledTransactions.stream()
            .map(ClientScheduledTransactionResponseDto::fromClientScheduledTransaction).
            toList();

        return new CombinedClientTransactionResponseDto(transactionDtos, scheduledTransactionDtos);
    }
}
