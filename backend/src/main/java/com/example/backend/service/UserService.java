package com.example.backend.service;

import com.example.backend.exception.custom.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }


    public User getUser(UUID id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) throw new UserNotFoundException();
        return user.get();
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    public User updateUser(UUID id, User user) {
        User existingUser = getUser(id);

        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());

        return userRepository.save(existingUser);
    }
}