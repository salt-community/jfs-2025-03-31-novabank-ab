package com.example.backend.dto;

import com.example.backend.model.User;

public record RegisterUserDto() {

    public User toUser() {
        return new User();
    }
}
