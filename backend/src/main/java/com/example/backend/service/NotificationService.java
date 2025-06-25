package com.example.backend.service;

import com.example.backend.dto.notificationDto.response.NotificationResponseDto;
import com.example.backend.model.Notification;
import com.example.backend.model.User;
import com.example.backend.repository.NotificationRepository;
import jakarta.transaction.Transactional;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    private final NotificationRepository repo;
    private final SimpMessagingTemplate messaging;
    private final UserService userService;

    public NotificationService(NotificationRepository repo,
                               SimpMessagingTemplate messaging, UserService userService) {
        this.repo = repo;
        this.messaging = messaging;
        this.userService = userService;
    }

    /** Send a new notification: save it, then push to the user over WebSocket */
    public Notification sendNotification(String userId, String message) {
        Notification n = new Notification();
        User user = userService.getUser(userId);
        n.setUser(user);
        n.setMessage(message);
        Notification saved = repo.save(n);

        // push to /user/{userId}/queue/notifications
        messaging.convertAndSendToUser(
                userId,
                "/queue/notifications",
                new NotificationResponseDto(saved.getId(), saved.getMessage(), saved.getCreatedAt())
        );

        return saved;
    }

    public List<Notification> getUserNotifications(String userId) {
        return repo.findAllByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional
    public List<Notification> markAsRead(String userId, List<UUID> notificationIds) {
        List<Notification> toMark = repo.findAllByIdInAndUserId(notificationIds, userId);
        toMark.forEach(n -> n.setRead(true));
        return repo.saveAll(toMark);
    }
}