package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "user_settings_configs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettingsConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NonNull
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private boolean smsNotifications = true;
    private boolean emailNotifications = true;
    private boolean cardTransactionNotifications = true;
    private boolean atmWithdrawalNotifications = true;
    private boolean depositNotifications = true;

    @NonNull
    @Column(nullable = false)
    private String language;

    @PrePersist
    public void prePersist() {
        this.smsNotifications = true;
        this.emailNotifications = true;
        this.cardTransactionNotifications = true;
        this.atmWithdrawalNotifications = true;
        this.depositNotifications = true;
        this.language = "en";
    }

}
