package com.example.backend.exception.custom;

public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }

    public InsufficientFundsException() {
        super("Insufficient funds to complete the transaction.");
    }
}
