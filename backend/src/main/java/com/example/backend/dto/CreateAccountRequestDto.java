package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.Currency;
import com.example.backend.model.User;
import com.example.backend.model.enums.BankAccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateAccountRequestDto(
        @NotNull BankAccountType type,
        @NotNull Currency currency
        ) {
    public Account toAccount(User user) {
        Account account = new Account();
        account.setUser(user);
        account.setType(type);
        account.setCurrency(currency);
        return account;
    }
}
