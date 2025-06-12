package com.example.backend.service;

import com.example.backend.exception.custom.UserAlreadyExistsException;
import com.example.backend.exception.custom.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.model.enums.UserStatus;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        boolean idExists = userRepository.existsById(user.getId());
        boolean emailExists = userRepository.existsByEmail(user.getEmail());

        if (idExists || emailExists) {
            throw new UserAlreadyExistsException("User with this ID or email already exists");
        }

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

    public User updateUser(String id, User user) {
        User existingUser = getUser(id);

        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());

        return userRepository.save(existingUser);
    }
}