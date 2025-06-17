package com.example.backend.dto.userDto.request;

import com.example.backend.model.Application;
import com.example.backend.model.enums.ApplicationStatus;

import java.time.LocalDateTime;

public record ApplicationRequestDto(
    String firstName,
    String lastName,
    String email,
    String personalNumber,
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
        return application;
    }
}
