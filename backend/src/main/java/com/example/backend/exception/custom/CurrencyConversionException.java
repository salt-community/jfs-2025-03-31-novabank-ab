package com.example.backend.exception.custom;

public class CurrencyConversionException extends RuntimeException {
    public CurrencyConversionException(String message) {
        super(message);
    }
}
