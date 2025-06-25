package com.example.backend.controller;

import com.example.backend.dto.userDto.response.LoginResponseDto;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.security.SecurityUtil;
import com.example.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping({"/api/auth", "/api/auth/"})
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final SecurityUtil securityUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        String email = securityUtil.extractEmailFromJWT(jwt);
        Role role = securityUtil.extractRoleFromJWT(jwt);
        User user = authService.loginUser(userId, role, email);
        log.info("User with ID: {} and Role: {} logging in with email: {}", userId, role, email);
        return ResponseEntity.ok(LoginResponseDto.fromUser(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<LoginResponseDto> logout(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        log.info("User with ID: {} logging out", userId);
        return ResponseEntity.ok(new LoginResponseDto(userId, LocalDateTime.now(), null));
    }
}
