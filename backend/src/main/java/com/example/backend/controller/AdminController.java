package com.example.backend.controller;

import com.example.backend.dto.adminDto.response.ListUserResponseDto;
import com.example.backend.dto.transactionDto.response.UnifiedTransactionResponseDto;
import com.example.backend.dto.userDto.response.UserResponseDTO;
import com.example.backend.model.Account;
import com.example.backend.model.Application;
import com.example.backend.model.User;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.ApplicationStatus;
import com.example.backend.service.AccountService;
import com.example.backend.service.TransactionService;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/admin", "/api/admin/"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final AccountService accountService;
    private final TransactionService transactionService;

    public AdminController(UserService userService, AccountService accountService, TransactionService transactionService) {
        this.userService = userService;
        this.accountService = accountService;
        this.transactionService = transactionService;
    }

    @Operation(summary = "Get all users", description = "Returns a list of all users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @GetMapping("/user")
    public ResponseEntity<ListUserResponseDto> getAllUsers() {
        List<UserResponseDTO> dtos = userService.getAllUsers().stream()
                .map(UserResponseDTO::fromUser)
                .toList();
        return ResponseEntity.ok(new ListUserResponseDto(dtos));
    }

    @Operation(summary = "Change user status", description = "Activate or suspend a user based on action query parameter")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated user status"),
            @ApiResponse(responseCode = "400", description = "Invalid action"),
            @ApiResponse(responseCode = "404", description = "User Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PatchMapping("/user/{userId}/status")
    public ResponseEntity<UserResponseDTO> updateUserStatus(
            @Parameter(name = "userId", description = "User id", example = "user_2yMYqxXhoEDq64tfBlelGADfdlp")
            @PathVariable String userId,
            @Parameter(
                    name = "action",
                    description = "Action to perform on user",
                    schema = @Schema(allowableValues = {"activate", "suspend"})
            )
            @RequestParam(name = "action") String action
    ) {
        User updatedUser;

        switch (action.toLowerCase()) {
            case "activate" -> updatedUser = userService.activateUser(userId);
            case "suspend" -> updatedUser = userService.suspendUser(userId);
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action: " + action);
        }

        return ResponseEntity.ok(UserResponseDTO.fromUser(updatedUser));
    }

    @Operation(summary = "Change account status", description = "Activate or suspend an account based on query parameter")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated account status"),
            @ApiResponse(responseCode = "400", description = "Invalid action"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PatchMapping("/account/{accountId}/status")
    public ResponseEntity<Account> updateAccountStatus(
            @PathVariable @NotNull UUID accountId,
            @Parameter(
                    name = "action",
                    description = "Action to perform on account",
                    schema = @Schema(allowableValues = {"activate", "suspend"})
            )
            @RequestParam(name = "action") String action,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        AccountStatus status;

        switch (action.toLowerCase()) {
            case "activate" -> status = AccountStatus.ACTIVE;
            case "suspend" -> status = AccountStatus.SUSPENDED;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action: " + action);
        }

        Account account = accountService.changeAccountStatus(accountId, userId, status);
        return ResponseEntity.ok(account);
    }

    @Operation(summary = "Get all applications", description = "Returns a list of applications")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping("/application")
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> applications = userService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @Operation(summary = "Get a application by id", description = "Returns the application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Application Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<Application> getApplicationById(@PathVariable UUID applicationId) {
        Application application = userService.getApplicationById(applicationId);
        return ResponseEntity.ok(application);
    }

    @Operation(
            summary = "Get paginated transaction history",
            description = "Returns a paginated list of all transactions"
    )
    @GetMapping("/transaction-history")
    public ResponseEntity<Page<UnifiedTransactionResponseDto>> getTransactionHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<UnifiedTransactionResponseDto> transactions = transactionService.getAllTransactionHistory(pageable);
        return ResponseEntity.ok(transactions);
    }

    @Operation(summary = "Updated application status", description = "Updates the application status based on query parameter")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated application status"),
            @ApiResponse(responseCode = "400", description = "Invalid action"),
            @ApiResponse(responseCode = "404", description = "Application Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PatchMapping("/application/{applicationId}")
    public ResponseEntity<Void> updateApplication(@PathVariable UUID applicationId, @RequestParam(name = "status") ApplicationStatus status){
        Application application = userService.getApplicationById(applicationId);
        userService.updateApplication(application, status);
        return ResponseEntity.ok().build();
    }

}
