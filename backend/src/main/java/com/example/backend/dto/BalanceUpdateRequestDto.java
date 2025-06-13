package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;

public record BalanceUpdateRequestDto(
        @NotNull Double amount,
        @NotNull UpdateType updateType
) {
    public enum UpdateType {
        DEPOSIT, WITHDRAW
    }
}
