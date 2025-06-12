package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.model.Account;
import com.example.backend.model.Currency;
import com.example.backend.model.User;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AccountService accountService;
    private final UserService userService;

    public AccountController(AccountService accountService, UserService userService) {
        this.accountService = accountService;
        this.userService = userService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponseDto> getAccount(@PathVariable UUID accountId) {
        Account account = accountService.getAccount(accountId);
        return ResponseEntity.ok(AccountResponseDto.fromAccount(account));
    }

    @GetMapping("/{userId}/accounts")
    public ResponseEntity<ListAccountResponseDto> getAllUserAccounts(@PathVariable String userId) {
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        return ResponseEntity.ok(
            ListAccountResponseDto.fromAccounts(accounts)
        );
    }

    // Do we need this?
    @GetMapping
    public ResponseEntity<ListAccountResponseDto> getAllAccounts() {
        return ResponseEntity.ok(
            ListAccountResponseDto.fromAccounts(accountService.getAllAccounts())
        );
    }

    @GetMapping("/{accountId}/balance")
    public ResponseEntity<BalanceResponseDto> getBalance(@PathVariable UUID accountId) {
        BalanceResponseDto response = new BalanceResponseDto(
                accountService.getBalance(accountId), LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createAccount(@RequestBody CreateAccountRequestDto dto) {
        User user = userService.getUser(dto.userId());
        Account created = accountService.createAccount(dto.toAccount(user));
        URI location = URI.create("api/account/" + created.getId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{accountId}/deposit")
    public ResponseEntity<Void> deposit(@Valid @PathVariable UUID accountId, @RequestBody DepositRequestDto dto) {
        accountService.addDeposit(accountId, dto.amount());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{accountId}/withdrawal")
    public ResponseEntity<Void> withdrawal(@Valid @PathVariable UUID accountId, @RequestBody WithdrawalRequestDto dto) {
        accountService.makeWithdrawal(accountId, dto.amount());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/suspend/{accountId}")
    public ResponseEntity<Void> suspendAccount(@PathVariable UUID accountId) {
        accountService.makeAccountSuspend(accountId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable UUID accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.noContent().build();
    }
}
