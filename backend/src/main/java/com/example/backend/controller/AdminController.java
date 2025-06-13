package com.example.backend.controller;

import com.example.backend.dto.AddNewUserRequestDto;
import com.example.backend.dto.ListAccountResponseDto;
import com.example.backend.model.User;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/admin", "/api/admin/"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final AccountService accountService;

    public AdminController(UserService userService, AccountService accountService) {
        this.userService = userService;
        this.accountService = accountService;
    }


    @Operation(summary = "Create new User", description = "Creates new User from Admin portal, returns User location in header")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created"),
            @ApiResponse(responseCode = "409", description = "User already exists"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PostMapping("/user")
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
    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        User user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get all users", description = "Returns a list of users, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "Suspend a user by id", description = "Returns the suspended user, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully suspended User"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @PatchMapping("/user/suspend/{userId}")
    public ResponseEntity<User> suspendUser(
        @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        User suspended = userService.suspendUser(userId);
        return ResponseEntity.ok(suspended);
    }

    @Operation(summary = "Activate a user by id", description = "Returns the re-activated user, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully suspended User"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @PatchMapping("/user/activate/{userId}")
    public ResponseEntity<User> activateUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        User activated = userService.activateUser(userId);
        return ResponseEntity.ok(activated);
    }

    @Operation(summary = "Delete a user by id", description = "Deletes the user from database, needs ADMIN rights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted User"),
            @ApiResponse(responseCode = "404", description = "User Not Found")
    })
    @DeleteMapping("/user/delete/{userId}")
    public ResponseEntity<Void> deleteUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/account")
    public ResponseEntity<ListAccountResponseDto> getAllAccounts() {
        return ResponseEntity.ok(
                ListAccountResponseDto.fromAccounts(accountService.getAllAccounts())
        );
    }

    @PatchMapping("/account/suspend/{accountId}")
    public ResponseEntity<Void> suspendAccount(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.changeAccountStatus(accountId, userId, AccountStatus.SUSPENDED);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/account/activate/{accountId}")
    public ResponseEntity<Void> activateAccount(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.changeAccountStatus(accountId, userId, AccountStatus.ACTIVE);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/account/delete/{accountId}")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.deleteAccount(accountId, userId);
        return ResponseEntity.noContent().build();
    }
}
