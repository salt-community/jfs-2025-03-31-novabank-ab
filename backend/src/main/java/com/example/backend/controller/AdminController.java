package com.example.backend.controller;

import com.example.backend.dto.AddNewUserRequestDto;
import com.example.backend.dto.ListAccountResponseDto;
import com.example.backend.model.Account;
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


    @Operation(summary = "Create new User", description = "Returns User location in header")
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

    @Operation(summary = "Get a user by id", description = "Returns a user as per the id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        User user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get all users", description = "Returns a list of all users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "Suspend a user by id", description = "Returns the suspended user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully suspended User"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PatchMapping("/user/{userId}/suspend")
    public ResponseEntity<User> suspendUser(
        @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        User suspended = userService.suspendUser(userId);
        return ResponseEntity.ok(suspended);
    }

    @Operation(summary = "Activate a user by id", description = "Returns the re-activated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully re-activate User"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PatchMapping("/user/{userId}/activate")
    public ResponseEntity<User> activateUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        User activated = userService.activateUser(userId);
        return ResponseEntity.ok(activated);
    }

    @Operation(summary = "Delete a user by id", description = "Deletes the user from database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted User"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteUser(
            @Parameter(name = "id", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp") @PathVariable("userId") String userId
    ) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get a all accounts", description = "Returns a list of all accounts")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @GetMapping("/account")
    public ResponseEntity<ListAccountResponseDto> getAllAccounts() {
        return ResponseEntity.ok(
                ListAccountResponseDto.fromAccounts(accountService.getAllAccounts())
        );
    }

    @Operation(summary = "Suspend a account by id", description = "Returns the suspended account")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully suspended User"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PatchMapping("/account/{accountId}/suspend")
    public ResponseEntity<Account> suspendAccount(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        Account account = accountService.changeAccountStatus(accountId, userId, AccountStatus.SUSPENDED);
        return ResponseEntity.ok(account);
    }

    @Operation(summary = "Activate a account by id", description = "Returns the re-activated account")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully re-activate Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PatchMapping("/account/{accountId}/activate")
    public ResponseEntity<Account> activateAccount(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        Account account = accountService.changeAccountStatus(accountId, userId, AccountStatus.ACTIVE);
        return ResponseEntity.ok(account);
    }

    @Operation(summary = "Delete a account by id", description = "Deletes the account from database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @DeleteMapping("/account/{accountId}")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.deleteAccount(accountId, userId);
        return ResponseEntity.noContent().build();
    }
}
