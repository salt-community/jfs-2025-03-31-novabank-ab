package com.example.backend.controller;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.dto.UpdateUserRequestDto;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
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

    @Operation(description = "Add new User")
    @PostMapping("/add-user")
    public ResponseEntity<Void> addUser(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @RequestBody RegisterUserDto dto) {
        String userId = jwt.getSubject();

        String userRole = Optional.ofNullable(jwt.getClaim("metadata"))
                .filter(Map.class::isInstance)
                .map(Map.class::cast)
                .map(m -> (String) m.get("role"))
                .orElse("user");

        Role role = Role.valueOf(userRole.toUpperCase());
        User created = userService.addUser(dto.toUser(userId, role));
        URI location = URI.create("api/user/" + created.getId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }


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

}