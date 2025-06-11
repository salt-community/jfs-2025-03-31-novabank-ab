package com.example.backend.controller;

import com.example.backend.dto.BalanceResponseDto;
import com.example.backend.dto.CreateAccountRequestDto;
import com.example.backend.dto.DepositRequestDto;
import com.example.backend.dto.WithdrawalRequestDto;
import com.example.backend.model.Account;
import com.example.backend.service.AccountService;
import jakarta.validation.Valid;
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

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccount(@PathVariable UUID accountId) {
        Account account = accountService.getAccount(accountId);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/{userId}/accounts")
    public ResponseEntity<List<Account>> getAllUserAccounts(@PathVariable UUID userId) {
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        return ResponseEntity.ok(accounts);
    }

    // Do we need this?
    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
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
        Account created = accountService.createAccount(dto);
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
        return null;
    }
}
