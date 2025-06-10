package com.example.backend.dto;

import com.example.backend.model.Balance;

import java.time.LocalDateTime;

// TODO: Change Double to Balance Entity (if we change to that structure)
public record BalanceResponseDto(
    Balance balance,
    LocalDateTime timestamp
) { }
