package com.example.backend.dto.userDto.request;

import com.example.backend.model.Application;
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
    public Application toApplication() {
        Application application = new Application();
        application.setCreatedAt(LocalDateTime.now());
        application.setEmail(this.email);
        application.setFirstName(this.firstName);
        application.setLastName(this.lastName);
        application.setPersonalNumber(this.personalNumber);
        application.setPhoneNumber(this.phoneNumber);
        application.setStatus(ApplicationStatus.PENDING);
        application.setCreatedAt(LocalDateTime.now());
        return application;
    }
}
