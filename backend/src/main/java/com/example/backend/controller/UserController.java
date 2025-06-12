package com.example.backend.controller;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.dto.UpdateUserRequestDto;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
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
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Register new User", description = "Creates new User from Clerk userId, returns User location in header")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PostMapping("/register")
    public ResponseEntity<Void> registerNewUser(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @RequestBody RegisterUserDto dto) {

        String userId = jwt.getSubject();
        Role role = extractRoleFromJWT(jwt);

        User created = userService.addUser(dto.toUser(userId, role));
        URI location = URI.create("/api/user/" + created.getId());

        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get a user by id", description = "Returns a user as per the id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("id") String id
    ) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get all users", description = "Returns a list of users, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Unexxpected Error")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id,
                                           @RequestBody UpdateUserRequestDto dto) {
        User updatedUser = userService.updateUser(id, dto.toUser());

        return ResponseEntity.ok(updatedUser)  ;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable String id) {

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
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