package com.example.backend.dto.userDto.request;

import com.example.backend.model.UserApplication;
import com.example.backend.model.enums.ApplicationStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ApplicationRequestDto(
    @NotNull
    String firstName,
    @NotNull
    String lastName,
    @NotNull
    String email,
    @NotNull
    String personalNumber,
    @NotNull
    String phoneNumber
) {
    public UserApplication toApplication() {
        UserApplication userApplication = new UserApplication();
        userApplication.setCreatedAt(LocalDateTime.now());
        userApplication.setEmail(this.email);
        userApplication.setFirstName(this.firstName);
        userApplication.setLastName(this.lastName);
        userApplication.setPersonalNumber(this.personalNumber);
        userApplication.setPhoneNumber(this.phoneNumber);
        userApplication.setStatus(ApplicationStatus.PENDING);
        userApplication.setCreatedAt(LocalDateTime.now());
        return userApplication;
    }
}
