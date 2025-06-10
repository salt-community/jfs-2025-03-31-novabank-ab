package com.example.backend.dto;

import com.example.backend.model.Account;
import jakarta.validation.constraints.NotNull;

// TODO: Change currency to Currency
// TODO: Implement toAccount
public record CreateAccountRequestDto(
        @NotNull Long userId,
        String currency
) {
    public Account toAccount() {
        return new Account();
    }
}
