package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.model.Account;
import com.example.backend.model.User;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
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

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponseDto> getAccount(
        @PathVariable @NotNull UUID accountId,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        Account account = accountService.getAccount(accountId, userId);
        return ResponseEntity.ok(AccountResponseDto.fromAccount(account));
    }

    @GetMapping("/accounts")
    public ResponseEntity<ListAccountResponseDto> getAllUserAccounts(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        return ResponseEntity.ok(
            ListAccountResponseDto.fromAccounts(accounts)
        );
    }

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

    @PatchMapping("/{accountId}/deposit")
    public ResponseEntity<Void> deposit(
        @PathVariable @NotNull
        UUID accountId,
        @RequestBody @Valid
        DepositRequestDto dto,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.addDeposit(accountId, dto.amount(), userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{accountId}/withdrawal")
    public ResponseEntity<Void> withdrawal(
        @PathVariable @NotNull
        UUID accountId,
        @RequestBody @Valid
        WithdrawalRequestDto dto,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.makeWithdrawal(accountId, dto.amount(), userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/suspend/{accountId}")
    public ResponseEntity<Void> suspendAccount(
        @PathVariable @NotNull
        UUID accountId,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.makeAccountSuspend(accountId, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount(
        @PathVariable @NotNull
        UUID accountId,
        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        accountService.deleteAccount(accountId, userId);
        return ResponseEntity.noContent().build();
    }
}
