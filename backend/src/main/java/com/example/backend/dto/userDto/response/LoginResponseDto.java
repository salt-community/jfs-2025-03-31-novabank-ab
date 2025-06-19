package com.example.backend.dto.userDto.response;

import com.example.backend.model.User;
import com.example.backend.model.enums.UserStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record LoginResponseDto(
        @NotNull String userId,
        @NotNull LocalDateTime timestamp,
        UserStatus status
) {
    public static LoginResponseDto fromUser(User user) {
        return new LoginResponseDto(user.getId(), LocalDateTime.now(), user.getStatus());
    }
}
