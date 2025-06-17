package com.example.backend.dto.userDto.request;

public record UpdateUserSettingsRequestDto(
        boolean smsNotifications,
        boolean emailNotifications,
        boolean cardTransactionNotifications,
        boolean atmWithdrawalNotifications,
        boolean depositNotifications,
        String language
) {}