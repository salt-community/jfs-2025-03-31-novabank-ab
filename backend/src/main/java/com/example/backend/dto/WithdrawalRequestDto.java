package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record WithdrawalRequestDto(
        @NotNull
        @Positive
        double amount
) {
}
