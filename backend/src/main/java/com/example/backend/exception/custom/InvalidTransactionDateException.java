package com.example.backend.exception.custom;

public class InvalidTransactionDateException extends RuntimeException {
    public InvalidTransactionDateException(String message) {
        super(message);
    }

    public InvalidTransactionDateException() {
        super("Transaction date is invalid");
    }
}
