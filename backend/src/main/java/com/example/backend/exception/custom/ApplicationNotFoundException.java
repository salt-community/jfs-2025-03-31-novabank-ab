package com.example.backend.exception.custom;

public class ApplicationNotFoundException extends RuntimeException {
    public ApplicationNotFoundException(String message) {
        super(message);
    }

    public ApplicationNotFoundException() {
        super("Application not found");
    }
}
