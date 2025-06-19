package com.example.backend.controller;

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

@Slf4j
@RestController
@RequestMapping({"/api/auth", "/api/auth/"})
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final SecurityUtil securityUtil;

    @PostMapping("/login")
    public ResponseEntity<User> login(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        Role role = securityUtil.extractRoleFromJWT(jwt);
        User user = authService.loginUser(userId, role);
        log.info("User with ID: {} and Role: {} logging in", userId, role);
        return ResponseEntity.ok(user);
    }
}
