package com.example.backend.controller;

import com.example.backend.dto.AddNewUserRequestDto;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping({"/api/admin", "/api/admin/"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }


    @Operation(summary = "Manually create new User", description = "Creates new User from Admin portal, returns User location in header")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created"),
            @ApiResponse(responseCode = "409", description = "User already exists"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PostMapping("/add-user")
    public ResponseEntity<Void> addUser(@RequestBody AddNewUserRequestDto dto) {
        User created = userService.addUser(dto.toUser());
        URI location = URI.create("/api/user/" + created.getId());
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get a user by id", description = "Returns a user as per the id, requires ADMIN")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @GetMapping("/get-user/{id}")
    public ResponseEntity<User> getUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("id") String id
    ) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get all users", description = "Returns a list of users, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @GetMapping("/get-all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "Suspend a user by id", description = "Returns the suspended user, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully suspended User"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/suspend-user/{id}")
    public ResponseEntity<User> suspendUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("id") String id
    ) {
        User suspended = userService.suspendUser(id);
        return ResponseEntity.ok(suspended);
    }

    @Operation(summary = "Activate a user by id", description = "Returns the re-activated user, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully suspended User"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/activate-user/{id}")
    public ResponseEntity<User> activateUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("id") String id
    ) {
        User activated = userService.activateUser(id);
        return ResponseEntity.ok(activated);
    }

    @Operation(summary = "Delete a user by id", description = "Deletes the user from database, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted User"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<Void> deleteUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("id") String id
    ) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
