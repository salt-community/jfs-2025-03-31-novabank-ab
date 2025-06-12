package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.Currency;
import com.example.backend.model.User;
import com.example.backend.model.enums.BankAccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

// TODO: Add Currency
public record CreateAccountRequestDto(
        @NotNull @NotBlank String userId,
        @NotNull BankAccountType type
) {
    public Account toAccount(User user) {
        Account account = new Account();
        account.setUser(user);
        account.setType(type);
        return account;
    }
}
