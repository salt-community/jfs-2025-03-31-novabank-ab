package com.example.backend.dto.adminDto.request;

import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

public record AddNewUserRequestDto(
        UUID applicationId
) { }
