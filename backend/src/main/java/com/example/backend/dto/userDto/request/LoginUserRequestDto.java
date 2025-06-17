package com.example.backend.dto.userDto.request;

import jakarta.validation.constraints.NotNull;

public record LoginUserRequestDto(
        @NotNull String userId,
        @NotNull String email,
        @NotNull String password
) {

}
