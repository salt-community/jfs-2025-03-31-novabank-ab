package com.example.backend.controller;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/add-user")
    public ResponseEntity<User> addUser(@RequestBody RegisterUserDto dto) {
        User user = userService.addUser(dto.toUser());
        return ResponseEntity.ok(user);
    }



    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        return ResponseEntity.badRequest().build();
    }


    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id,
                                           @RequestBody User user) {
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id) {
        return ResponseEntity.badRequest().build();
    }

}
