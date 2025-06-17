package com.example.backend.controller;

import com.example.backend.dto.adminDto.request.AddNewUserRequestDto;
import com.example.backend.dto.userDto.request.ApplicationRequestDto;
import com.example.backend.dto.userDto.request.UpdateUserRequestDto;
import com.example.backend.dto.userDto.response.UserResponseDTO;
import com.example.backend.model.Application;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Parameter;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping({"/api/user", "/api/user/"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get a user", description = "Returns a user based on Clerk token userId (Requires JWT in header)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping
    public ResponseEntity<UserResponseDTO> getUser(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        User user = userService.getUser(userId);
        return ResponseEntity.ok(UserResponseDTO.fromUser(user));
    }

    @Operation(summary = "Create new User", description = "Returns User location in header")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created"),
            @ApiResponse(responseCode = "409", description = "User already exists"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> addUserFromApplication(@RequestBody AddNewUserRequestDto dto,
                                                       @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        User created = userService.addUser(dto.applicationId());
        URI location = URI.create("/api/user/" + created.getId());
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get a user by id", description = "Returns a user as per the id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> getUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        User user = userService.getUser(userId);
        return ResponseEntity.ok(UserResponseDTO.fromUser(user));
    }

    @Operation(summary = "Update user", description = "Returns the updated user (Requires JWT in header)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PutMapping
    public ResponseEntity<UserResponseDTO> updateUser(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @RequestBody UpdateUserRequestDto dto
    ) {
        String userId = jwt.getSubject();
        User updatedUser = userService.updateUser(userId, dto);
        return ResponseEntity.ok(UserResponseDTO.fromUser(updatedUser));
    }

    @Operation(summary = "Create register application", description = "Returns the location of the application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PostMapping("/application")
    public ResponseEntity<Void> sendRegisterApplication(@RequestBody ApplicationRequestDto dto) {
        Application application = userService.sendRegisterApplication(dto.toApplication());
        URI location = URI.create("/api/user/application/" + application.getId());
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get a application by id", description = "Returns the application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Application Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping("/application/{applicationId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Application> getApplicationById(@PathVariable UUID applicationId) {
        Application application = userService.getApplicationById(applicationId);
        return ResponseEntity.ok(application);
    }

}