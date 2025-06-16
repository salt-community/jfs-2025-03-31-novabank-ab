package com.example.backend.exception.custom;

public class NicknameNotFoundException extends RuntimeException{
    public NicknameNotFoundException(String message) {
        super(message);
    }

    public NicknameNotFoundException() {
        super("Nickname not found");
    }
}
