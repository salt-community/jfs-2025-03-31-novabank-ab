package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.ScheduledTransaction;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

//TODO: Make sure it returns correct data

public record ScheduledRequestDto(
        Account from,
        Account to,
        @NotNull
        double amount,
        LocalDateTime date,
        String description
) {
    public ScheduledTransaction toScheduledTransaction() {
        return new ScheduledTransaction();
    }
}
