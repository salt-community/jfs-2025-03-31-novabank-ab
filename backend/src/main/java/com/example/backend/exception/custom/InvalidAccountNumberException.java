package com.example.backend.exception.custom;

public class InvalidAccountNumberException extends RuntimeException{
    public InvalidAccountNumberException(String message) {
        super(message);
    }

    public InvalidAccountNumberException() {
        super("Account number is invalid");
    }
}
