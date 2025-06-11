package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.Currency;
import com.example.backend.model.enums.BankAccountType;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

// TODO: Change currency to Currency
// TODO: Implement toAccount
public record CreateAccountRequestDto(
        @NotNull UUID userId,
        Currency currency,
        BankAccountType type
) {
    public Account toAccount() {
        return new Account();
    }
}
