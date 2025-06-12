package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.BankAccountType;

import java.time.LocalDate;
import java.util.UUID;

public record AccountResponseDto(UUID id, double balance, BankAccountType type, LocalDate createdAt, AccountStatus status, String accountNumber) {
    public static AccountResponseDto fromAccount(Account account) {
        return new AccountResponseDto(account.getId(), account.getBalance(), account.getType(), account.getCreatedAt(), account.getStatus(), account.getAccountNumber());
    }
}
