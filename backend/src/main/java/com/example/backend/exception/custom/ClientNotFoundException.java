package com.example.backend.exception.custom;

public class ClientNotFoundException extends RuntimeException{
    public ClientNotFoundException(String message) {
        super(message);
    }

    public ClientNotFoundException() {
        super("Client not found");
    }
}
