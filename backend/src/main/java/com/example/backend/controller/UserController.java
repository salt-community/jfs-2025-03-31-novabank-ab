package com.example.backend.controller;

import com.example.backend.dto.RegisterUserRequestDto;
import com.example.backend.dto.UpdateUserRequestDto;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Parameter;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping({"/api/user", "/api/user"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @Operation(summary = "Register new User", description = "Creates new User from Clerk userId, returns User location in header")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = "Successfully created"),
//            @ApiResponse(responseCode = "409", description = "User already exists"),
//            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
//    })
//    @PostMapping
//    public ResponseEntity<Void> registerNewUser(
//            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
//            @RequestBody RegisterUserRequestDto dto
//    ) {
//
//        String userId = jwt.getSubject();
//        Role role = extractRoleFromJWT(jwt);
//
//        User created = userService.addUser(dto.toUser(userId, role));
//        URI location = URI.create("/api/user/" + created.getId());
//
//        return ResponseEntity.created(location).build();
//    }

    @Operation(summary = "Get a user", description = "Returns a user based on Clerk token userId")
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

    @Operation(summary = "Update user", description = "Returns the updated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
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

    private Role extractRoleFromJWT(Jwt jwt) {
        String userRole = Optional.ofNullable(jwt.getClaim("metadata"))
                .filter(Map.class::isInstance)
                .map(Map.class::cast)
                .map(m -> (String) m.get("role"))
                .orElse("user");

        return Role.valueOf(userRole.toUpperCase());
    }
}