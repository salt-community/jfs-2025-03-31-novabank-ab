package com.example.backend.exception.custom;

public class SettingsConfigNotFoundException extends RuntimeException {
    public SettingsConfigNotFoundException(String message) {
        super(message);
    }
    public SettingsConfigNotFoundException() {
        super("No settings config found for user");
    }
}
