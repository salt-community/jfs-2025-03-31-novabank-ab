package com.example.backend.dto.adminDto.request;

import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

public record AddNewUserRequestDto(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String role
) {
    public User toUser(String userId) {
        return new User(
                userId,
                String.format("%s %s", this.firstName, this.lastName),
                this.email,
                this.phoneNumber,
                Role.USER,
                UserStatus.ACTIVE,
                LocalDateTime.now(),
                null,
                new ArrayList<>()
        );
    }
}
