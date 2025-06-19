package com.example.backend.dto.userDto.response;

public record UserSettingsResponseDTO(boolean smsNotifications, boolean emailNotifications, boolean cardTransactionNotifications, boolean atmWithdrawalNotifications, boolean depositNotifications, String language) {

}
