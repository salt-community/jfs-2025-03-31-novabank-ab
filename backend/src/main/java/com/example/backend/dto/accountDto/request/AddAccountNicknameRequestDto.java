package com.example.backend.dto.accountDto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddAccountNicknameRequestDto(@NotNull @NotBlank String nickname) {}
