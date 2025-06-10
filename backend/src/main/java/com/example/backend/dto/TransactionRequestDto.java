package com.example.backend.dto;

import com.example.backend.model.Account;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record TransactionRequestDto(Account from,
                                    Account to,
                                    @NotNull
                                    double amount,
                                    LocalDateTime date) {
}
