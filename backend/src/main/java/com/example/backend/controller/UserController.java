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


    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody RegisterUserDto dto) {
        User user = userService.addUser(dto.toUser());
        return ResponseEntity.ok(user);
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
