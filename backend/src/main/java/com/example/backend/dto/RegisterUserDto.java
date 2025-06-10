package com.example.backend.dto;

public record RegisterUserDto() {

    public User toUser() {
        return new User();
    }
}
