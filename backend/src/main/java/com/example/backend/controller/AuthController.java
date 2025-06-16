package com.example.backend.controller;

import com.example.backend.dto.userDto.request.LoginUserRequestDto;
import com.example.backend.model.User;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping({"/api/auth", "/api/auth/"})
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginUserRequestDto request) {
        log.info("Login request received for {}", request.email());
        User user = authService.loginUser(request.email(), request.password());
        log.info("User logging in: {}", user.getId());
        return ResponseEntity.ok(user);
    }
}
