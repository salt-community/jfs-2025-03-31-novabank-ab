package com.example.backend.controller;

import com.example.backend.dto.accountDto.response.ListAccountResponseDto;
import com.example.backend.dto.accountDto.request.BalanceUpdateRequestDto;
import com.example.backend.dto.accountDto.request.CreateAccountRequestDto;
import com.example.backend.dto.accountDto.response.AccountResponseDto;
import com.example.backend.dto.accountDto.response.BalanceResponseDto;
import com.example.backend.model.Account;
import com.example.backend.model.User;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/account", "/api/account/"})
@Validated
public class AccountController {

    private final AccountService accountService;
    private final UserService userService;

    public AccountController(AccountService accountService, UserService userService) {
        this.accountService = accountService;
        this.userService = userService;
    }

    @Operation(summary = "Get a account", description = "Returns a account based on Clerk token userId (Requires JWT in header) and accountId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "401", description = "User Not Authorized to Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponseDto> getAccount(
        @PathVariable @NotNull UUID accountId,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        Account account = accountService.getAccount(accountId, userId);
        return ResponseEntity.ok(AccountResponseDto.fromAccount(account));
    }

    @Operation(summary = "Get all user accounts", description = "Returns a list of accounts based on Clerk token userId (Requires JWT in header)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping
    public ResponseEntity<ListAccountResponseDto> getAllUserAccounts(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        return ResponseEntity.ok(
            ListAccountResponseDto.fromAccounts(accounts)
        );
    }

    @Operation(summary = "Get balance from account", description = "Returns the balance for a account based on Clerk token userId (Requires JWT in header) and accountId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "401", description = "User Not Authorized to Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping("/{accountId}/balance")
    public ResponseEntity<BalanceResponseDto> getBalance(
        @PathVariable @NotNull UUID accountId,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        BalanceResponseDto response = new BalanceResponseDto(
                accountService.getBalance(accountId, userId), LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Creates a account", description = "Returns the location to a account connected to Clerk token userId (Requires JWT in header)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PostMapping
    public ResponseEntity<Void> createAccount(
        @RequestBody @Valid CreateAccountRequestDto dto,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        User user = userService.getUser(userId);
        Account created = accountService.createAccount(dto.toAccount(user));
        URI location = URI.create("api/account/" + created.getId());
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get balance from account", description = "Updates the balance for a account based on Clerk token userId (Requires JWT in header) and accountId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "400", description = "Insufficient funds in Account"),
            @ApiResponse(responseCode = "401", description = "User Not Authorized to Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PatchMapping("/{accountId}/balance")
    public ResponseEntity<Void> deposit(
        @PathVariable @NotNull UUID accountId,
        @RequestBody @Valid BalanceUpdateRequestDto dto,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.updateBalance(accountId, userId, dto.amount(), dto.updateType());
        return ResponseEntity.ok().build();
    }

}
