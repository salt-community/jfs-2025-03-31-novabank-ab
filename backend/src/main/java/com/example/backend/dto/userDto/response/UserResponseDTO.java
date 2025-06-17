package com.example.backend.dto.userDto.response;

import com.example.backend.model.User;

public record UserResponseDTO(String id, String firstName, String lastName) {
    public static UserResponseDTO fromUser(User user) {
        return new UserResponseDTO(user.getId(), user.getFirstName(), user.getLastName());
    }
}
