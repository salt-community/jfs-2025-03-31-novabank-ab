package com.example.backend.repository;

import com.example.backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findAllByUserIdOrderByCreatedAtDesc(String userId);
    List<Notification> findAllByIdInAndUserId(List<UUID> ids, String userId);
}