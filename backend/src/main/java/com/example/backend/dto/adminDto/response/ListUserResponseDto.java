package com.example.backend.dto.adminDto.response;

import com.example.backend.dto.userDto.response.UserResponseDTO;

import java.util.List;

public record ListUserResponseDto(List<UserResponseDTO> users) {
}
