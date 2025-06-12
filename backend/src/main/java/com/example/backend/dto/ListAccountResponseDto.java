package com.example.backend.dto;

import com.example.backend.model.Account;

import java.util.List;

public record ListAccountResponseDto(List<AccountResponseDto> accounts) {
    public static ListAccountResponseDto fromAccounts(List<Account> accounts) {
        List<AccountResponseDto> accountResponseDtos = accounts.stream().map(AccountResponseDto::fromAccount).toList();
        return new ListAccountResponseDto(accountResponseDtos);
    }
}
