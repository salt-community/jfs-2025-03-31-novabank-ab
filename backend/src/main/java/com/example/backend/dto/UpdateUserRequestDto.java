package com.example.backend.dto;

import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;

public record UpdateUserRequestDto(
        String fullname,
        String email,
        String phoneNumber,
        Role role,
        UserStatus status
) { }
