package com.example.backend.dto;

import com.example.backend.model.Account;
import jakarta.annotation.Nonnull;

// TODO: Change currency to Currency
public record CreateAccountRequestDto(
        @Nonnull Long userId,
        String currency
) {
    public Account toAccount() {
        return new Account();
    }
}
