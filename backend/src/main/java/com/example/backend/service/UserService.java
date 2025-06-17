package com.example.backend.service;

import com.example.backend.dto.userDto.request.UpdateUserRequestDto;
import com.example.backend.exception.custom.ApplicationNotFoundException;
import com.example.backend.exception.custom.UserAlreadyExistsException;
import com.example.backend.exception.custom.UserNotFoundException;
import com.example.backend.model.Application;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;
import com.example.backend.repository.ApplicationRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.ClerkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class UserService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClerkService clerkService;

    public UserService(ApplicationRepository applicationRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, ClerkService clerkService) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.clerkService = clerkService;
    }

    public User addUser(UUID applicationId) {
        Application application = applicationRepository
                .findById(applicationId).orElseThrow(ApplicationNotFoundException::new);

        if (userRepository.existsByEmail(application.getEmail())) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }

        String generatedPassword = UUID.randomUUID().toString();
        String userId = clerkService.createClerkUser(
                application.getEmail(),
                application.getFirstName(),
                application.getLastName(),
                application.getPhoneNumber(),
                generatedPassword
        );

        User user = new User(
                userId,
                passwordEncoder.encode(generatedPassword),
                application.getFirstName(),
                application.getLastName(),
                application.getEmail(),
                application.getPhoneNumber(),
                Role.USER,
                UserStatus.ACTIVE,
                LocalDateTime.now(),
                null,
                new ArrayList<>()
        );

        log.info(String.valueOf(user));
        return userRepository.save(user);
    }

    public User getUser(String id) {
        return userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User suspendUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        user.setStatus(UserStatus.SUSPENDED);
        return userRepository.save(user);
    }

    public User activateUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        user.setStatus(UserStatus.ACTIVE);
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        userRepository.deleteById(id);
    }

    public User updateUser(String id, UpdateUserRequestDto dto) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        if (dto.firstName() != null) {
            user.setFirstName(dto.firstName());
        }
        if (dto.lastName() != null) {
            user.setLastName(dto.lastName());
        }
        if (dto.email() != null) {
            user.setEmail(dto.email());
        }
        if (dto.phoneNumber() != null) {
            user.setPhoneNumber(dto.phoneNumber());
        }
        if (dto.role() != null) {
            user.setRole(dto.role());
        }
        if (dto.status() != null) {
            user.setStatus(dto.status());
        }

        return userRepository.save(user);
    }

    public Application sendRegisterApplication(Application application) {
        return applicationRepository.save(application);
    }

    public Application getApplicationById(UUID id) {
        return applicationRepository.findById(id).orElseThrow(ApplicationNotFoundException::new);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
}