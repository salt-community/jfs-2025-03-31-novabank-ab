package com.example.backend.controller;

import com.example.backend.dto.userDto.request.ApplicationRequestDto;
import com.example.backend.dto.userDto.request.UpdateUserRequestDto;
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
@RequestMapping({"/api/user", "/api/user"})
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
    public ResponseEntity<User> getUser(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        User user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Update user", description = "Returns the updated user (Requires JWT in header)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PutMapping
    public ResponseEntity<User> updateUser(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @RequestBody UpdateUserRequestDto dto
    ) {
        String userId = jwt.getSubject();
        User updatedUser = userService.updateUser(userId, dto);
        return ResponseEntity.ok(updatedUser);
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