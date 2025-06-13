package com.example.backend.dto;

import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;

import java.time.LocalDateTime;

public record RegisterUserRequestDto(
        String email,
        String phoneNumber,
        String firstName,
        String lastName
) {
    public User toUser(String id, Role role) {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setFullName(String.format("%s %s", firstName, lastName));
        user.setCreatedAt(LocalDateTime.now());
        user.setLastLogin(null);
        user.setStatus(UserStatus.ACTIVE);
        user.setRole(role);
        return user;
    }
}
