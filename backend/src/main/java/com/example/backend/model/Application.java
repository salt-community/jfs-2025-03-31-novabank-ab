package com.example.backend.model;

import com.example.backend.model.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    ApplicationStatus status;

    @Column(nullable = false)
    String firstName;
    @Column(nullable = false)
    String lastName;
    @Column(nullable = false)
    String personalNumber;
    @Column(nullable = false)
    String email;
    @Column(nullable = false)
    String phoneNumber;
}
