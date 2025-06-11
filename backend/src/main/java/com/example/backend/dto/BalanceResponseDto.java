package com.example.backend.dto;

import com.example.backend.model.Balance;

import java.time.LocalDateTime;

public record BalanceResponseDto(
    Balance balance,
    LocalDateTime timestamp
) { }
