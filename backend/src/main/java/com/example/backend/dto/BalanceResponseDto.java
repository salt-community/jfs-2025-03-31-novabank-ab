package com.example.backend.dto;

import java.time.LocalDateTime;

public record BalanceResponseDto(
    double balance,
    LocalDateTime timestamp
) { }
