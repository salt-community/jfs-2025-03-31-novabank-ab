package com.example.backend.dto;

import com.example.backend.model.User;
import com.example.backend.model.enums.Role;

public record RegisterUserDto(
        String email,
        String firstName,
        String lastName
) {
    public User toUser(String id, Role role) {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setFullName(String.format("%s %s", firstName, lastName));
        user.setRole(role);
        return user;
    }
}
