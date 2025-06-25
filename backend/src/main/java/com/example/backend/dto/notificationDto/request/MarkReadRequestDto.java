package com.example.backend.dto.notificationDto.request;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.UUID;

public record MarkReadRequestDto(
        @NotEmpty
        List<UUID> notificationIds
) {}