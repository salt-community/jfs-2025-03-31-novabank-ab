package com.example.backend.dto.accountDto.response;

import java.time.LocalDateTime;

public record BalanceResponseDto(
    double balance,
    LocalDateTime timestamp
) { }
