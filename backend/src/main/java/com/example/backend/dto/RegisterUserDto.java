package com.example.backend.dto;

import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;

import java.time.LocalDateTime;

public record RegisterUserDto(
    String fullname,
    String email,
    String phoneNumber,
    Role role,
    UserStatus status
) {

    public User toUser() {
        User user = new User();
        user.setFullName(fullname);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setRole(role);
        user.setStatus(status);
        user.setCreatedAt(LocalDateTime.now());
        user.setLastLogin(null);
        return user;
    }
}
