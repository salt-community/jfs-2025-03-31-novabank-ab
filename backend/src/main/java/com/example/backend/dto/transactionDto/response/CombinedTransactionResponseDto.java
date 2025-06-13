package com.example.backend.dto.transactionDto.response;

import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;

import java.util.List;

public record CombinedTransactionResponseDto(
        List<Transaction> transactions,
        List<ScheduledTransaction> scheduledTransactions
) {
}
