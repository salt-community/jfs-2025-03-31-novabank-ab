package com.example.backend.dto;

// TODO: Change Double to Balance Entity (if we change to that structure)
public record BalanceResponseDto(
    String currency,
    Double balance
) { }
