package com.example.backend.controller;

import com.example.backend.dto.notificationDto.response.NotificationResponseDto;
import com.example.backend.model.Notification;
import com.example.backend.service.NotificationService;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/admin/notifications")
    public ResponseEntity<NotificationResponseDto> notifyUser(
            @RequestParam String userId,
            @RequestBody String message
    ) {
        Notification notification = service.sendNotification(userId, message);
        NotificationResponseDto dto = new NotificationResponseDto(
                notification.getId(),
                notification.getMessage(),
                notification.getCreatedAt()
        );

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/api/notifications")
    public ResponseEntity<List<NotificationResponseDto>> getAllNotificationsForUser(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        List<Notification> notifs = service.getUserNotifications(userId);

        List<NotificationResponseDto> dtos = notifs.stream()
                .map(n -> new NotificationResponseDto(
                        n.getId(),
                        n.getMessage(),
                        n.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}