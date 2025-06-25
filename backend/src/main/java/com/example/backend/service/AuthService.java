package com.example.backend.service;

import com.example.backend.exception.custom.InvalidCredentialsException;
import com.example.backend.exception.custom.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User loginUser(String userId, Role role) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        user.setRole(role);
        user.setLastLogin(LocalDateTime.now());
        return user;
    }
}
