package com.example.backend.dto;

import com.example.backend.model.Account;
import jakarta.validation.constraints.NotNull;

public record TransactionRequestDto(Account from,
                                    Account to,
                                    @NotNull
                                    double amount) {
}
