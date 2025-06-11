package com.example.backend.controller;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;


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



    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody RegisterUserDto dto, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();

        String roleString = Optional.ofNullable(jwt.getClaim("metadata"))
                .filter(Map.class::isInstance)
                .map(Map.class::cast)
                .map(m -> (String) m.get("role"))
                .orElse("user");

        Role role = Role.valueOf(roleString.toUpperCase());

        User user = dto.toUser(userId, role);

        System.out.println("user = " + user);
        return ResponseEntity.ok(userService.addUser(user));
    }



    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }


    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id,
                                           @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);

        return ResponseEntity.ok(updatedUser)  ;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable long id) {

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

}