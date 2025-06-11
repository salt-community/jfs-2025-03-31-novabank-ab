package com.example.backend.exception.dto;

import java.time.LocalDateTime;

public record ErrorResponseDto(
        String message,
        int status,
        LocalDateTime timestamp
) { }
