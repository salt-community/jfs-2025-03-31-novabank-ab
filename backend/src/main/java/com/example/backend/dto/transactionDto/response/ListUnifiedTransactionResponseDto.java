package com.example.backend.dto.transactionDto.response;

import com.example.backend.model.Transaction;

import java.util.List;

public record ListUnifiedTransactionResponseDto(List<UnifiedTransactionResponseDto> transactions) {
    public static ListUnifiedTransactionResponseDto fromTransactions(List<Transaction> transactions) {
        return new ListUnifiedTransactionResponseDto(
            transactions.stream()
                .map(UnifiedTransactionResponseDto::fromTransaction)
                .toList()
        );
    }
}
