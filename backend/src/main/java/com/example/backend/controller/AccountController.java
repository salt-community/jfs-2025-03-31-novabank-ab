package com.example.backend.controller;

import com.example.backend.dto.accountDto.request.AddAccountNicknameRequestDto;
import com.example.backend.dto.accountDto.request.BalanceUpdateRequestDto;
import com.example.backend.dto.accountDto.request.CreateAccountRequestDto;
import com.example.backend.dto.accountDto.response.AccountResponseDto;
import com.example.backend.dto.accountDto.response.BalanceResponseDto;
import com.example.backend.dto.accountDto.response.ListAccountResponseDto;
import com.example.backend.dto.accountDto.response.NicknameResponseDto;
import com.example.backend.model.Account;
import com.example.backend.model.Currency;
import com.example.backend.model.User;
import com.example.backend.service.AccountService;
import com.example.backend.service.CurrencyService;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private final CurrencyService currencyService;

    public AccountController(AccountService accountService, UserService userService, CurrencyService currencyService) {
        this.accountService = accountService;
        this.userService = userService;
        this.currencyService = currencyService;
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
        Currency currency = currencyService.getCurrencyFromAbbrevation(dto.abbrevation());
        Account created = accountService.createAccount(dto.toAccount(user, currency));
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

    @Operation(summary = "Update name of account", description = "Updates the nickname for an account based on Clerk token userId (Requires JWT in header) and accountId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated"),
            @ApiResponse(responseCode = "401", description = "User Not Authorized to Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @PutMapping("/{accountId}/nickname")
    public ResponseEntity<Void> updateAccountNickname(
            @PathVariable @NotNull UUID accountId,
            @RequestBody @Valid AddAccountNicknameRequestDto dto,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.updateAccountNickname(userId, accountId, dto.nickname());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get name of account", description = "Gets the name of an account based on Clerk token userId (Requires JWT in header) and accountId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "401", description = "User Not Authorized to Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @GetMapping("/{accountId}/nickname")
    public ResponseEntity<NicknameResponseDto> getAccountNickname(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        String name = accountService.getAccountNickname(userId, accountId);
        return ResponseEntity.ok(new NicknameResponseDto(name));
    }

    @Operation(summary = "Delete nickname of account", description = "Deletes the nickname of an account based on Clerk token userId (Requires JWT in header) and accountId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "401", description = "User Not Authorized to Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "404", description = "Nickname Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected Error")
    })
    @DeleteMapping("/{accountId}/nickname")
    public ResponseEntity<Void> deleteAccountNickname(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.deleteAccountNickname(userId, accountId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete a account by id (Requires ADMIN)", description = "Deletes the account from database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted Account"),
            @ApiResponse(responseCode = "404", description = "Account Not Found"),
            @ApiResponse(responseCode = "500", description = "Unexpected Error")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable @NotNull UUID accountId,
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.deleteAccount(accountId, userId);
        return ResponseEntity.noContent().build();
    }
}
