package com.example.backend.repository;

import com.example.backend.model.User;
import com.example.backend.model.UserSettingsConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserSettingsRepository extends JpaRepository<UserSettingsConfig, UUID> {
    Optional<UserSettingsConfig> findByUser(User user);
}
