package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;
import java.util.UUID;

public record ScheduledRequestDto(
        @NotNull UUID fromAccountId,
        @NotNull UUID toAccountId,
        @NotNull
        @Positive
        double amount,
        @NotNull LocalDateTime scheduledDate,
        String description,
        String userNote,
        String ocrNumber
) {}

