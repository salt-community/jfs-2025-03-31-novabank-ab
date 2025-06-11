package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.Transaction;
import jakarta.validation.constraints.NotNull;


public record TransactionRequestDto(Account from,
                                    Account to,
                                    @NotNull
                                    double amount) {
    public Transaction convertToTransaction(){
        return new Transaction();

    }
}
