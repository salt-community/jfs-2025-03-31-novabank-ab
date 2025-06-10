package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.User;
import jakarta.annotation.Nonnull;

// TODO: Change currency to Currency
// TODO: Implement toAccount
public record CreateAccountRequestDto(
        @Nonnull Long userId,
        String currency
) {
    public Account toAccount() {
        return new Account();
    }
}
