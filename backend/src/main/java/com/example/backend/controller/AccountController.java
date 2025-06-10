package com.example.backend.controller;

import com.example.backend.dto.BalanceResponseDto;
import com.example.backend.dto.CreateAccountRequestDto;
import com.example.backend.dto.DepositRequestDto;
import com.example.backend.dto.WithdrawalRequestDto;
import com.example.backend.model.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccount(@PathVariable long accountId) {
        return null;
    }

    @GetMapping("/{userId}/accounts")
    public ResponseEntity<List<Account>> getAllUserAccounts(@PathVariable long userId) {
        return null;
    }

    // Do we need this?
    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        return null;
    }

    @GetMapping("/{accountId}/balance")
    public ResponseEntity<BalanceResponseDto> getBalance(@PathVariable long accountId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<Void> addAccount(@RequestBody CreateAccountRequestDto dto) {
        return null;
    }

    @PatchMapping("/{accountId}/deposit")
    public ResponseEntity<Void> deposit(@PathVariable long accountId, @RequestBody DepositRequestDto dto) {
        return null;
    }

    @PatchMapping("/{accountId}/withdrawal")
    public ResponseEntity<Void> withdrawal(@PathVariable long accountId, @RequestBody WithdrawalRequestDto dto) {
        return null;
    }

    @PatchMapping("/suspend/{accountId}")
    public ResponseEntity<Void> suspendAccount(@PathVariable long accountId) {
        return null;
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable long accountId) {
        return null;
    }
}
