package com.example.backend.exception.custom;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(String message) {
        super(message);
    }

    public AccountNotFoundException() {
        super("Account not found");
    }
}
