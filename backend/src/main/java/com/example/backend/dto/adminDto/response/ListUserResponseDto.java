package com.example.backend.dto.adminDto.response;

import com.example.backend.dto.userDto.response.UserDTO;

import java.util.List;

public record ListUserResponseDto(List<UserDTO> users) {
}
