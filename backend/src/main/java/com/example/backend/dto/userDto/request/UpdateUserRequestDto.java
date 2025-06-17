package com.example.backend.dto.userDto.request;

import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;

public record UpdateUserRequestDto(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Role role,
        UserStatus status
) { }
