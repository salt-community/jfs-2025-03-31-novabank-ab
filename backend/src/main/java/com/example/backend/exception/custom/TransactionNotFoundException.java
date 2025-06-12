package com.example.backend.exception.custom;

public class TransactionNotFoundException extends RuntimeException {
    public TransactionNotFoundException(String message) {
        super(message);
    }
    public TransactionNotFoundException(){
        super("Transaction not found");
    }
}
