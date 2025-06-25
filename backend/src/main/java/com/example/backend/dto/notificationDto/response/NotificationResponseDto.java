package com.example.backend.dto.notificationDto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record NotificationResponseDto(
      UUID id,
      String message,
      LocalDateTime createdAt
) {}