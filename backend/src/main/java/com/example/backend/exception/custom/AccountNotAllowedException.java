package com.example.backend.exception.custom;

public class AccountNotAllowedException extends RuntimeException {
    public AccountNotAllowedException(String message) {
        super(message);
    }

}
