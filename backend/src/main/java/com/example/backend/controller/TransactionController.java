package com.example.backend.controller;

import com.example.backend.dto.ScheduledRequestDto;
import com.example.backend.dto.TransactionRequestDto;
import com.example.backend.model.Account;
import com.example.backend.service.AccountService;
import com.example.backend.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping({"/api/account/{accountId}/transaction", "/api/account/{accountId}/transaction/"})
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService;

    @Autowired
    public TransactionController(TransactionService service, AccountService accountService) {
        this.transactionService = service;
        this.accountService = accountService;
    }

    @Operation(
            summary = "Retrieve a specific transaction by ID",
            description = "Fetches a single transaction from the database using its unique identifier (UUID)."
    )
    @GetMapping("/{transactionId}")
    public ResponseEntity<?> getTransaction(@PathVariable UUID transactionId, @PathVariable String accountId) {
        return ResponseEntity.ok().body(transactionService.getTransaction(transactionId));
    }

    @Operation(
            summary = "Retrieve all transactions for a specific account",
            description = "Returns all transactions where the specified account is either the sender (fromAccount) or the receiver (toAccount)."
    )
    @GetMapping("/transaction-history")
    public ResponseEntity<?> getAllTransactions(@PathVariable UUID accountId) {
        return ResponseEntity.ok().body(transactionService.getAllTransactions(accountId));
    }

    @Operation(
            summary = "Create a new transaction",
            description = "Adds a new immediate transaction to the database based on the provided request data."
    )
    @PostMapping
    public ResponseEntity<?> addTransaction(@RequestBody TransactionRequestDto dto, @PathVariable UUID accountId) {
        Account ownAccount = accountService.getAccount(accountId);
        transactionService.addTransaction(dto.convertToTransaction(ownAccount));
        return ResponseEntity.ok().build();
    }
    @Operation(
            summary = "Create a scheduled transaction",
            description = "Adds a new scheduled (future-dated) transaction to the system based on the provided request data.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Scheduled transaction successfully created"),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping("/create-scheduled")
    public ResponseEntity<?> addScheduledTransaction(@RequestBody ScheduledRequestDto dto, @PathVariable String accountId) {
        transactionService.addScheduledTransaction(dto.toScheduledTransaction());
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Delete a scheduled transaction",
            description = "Deletes a scheduled transaction from the system using its unique transaction ID.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Scheduled transaction successfully deleted"),
                    @ApiResponse(responseCode = "404", description = "Scheduled transaction not found"),
                    @ApiResponse(responseCode = "400", description = "Invalid transaction ID format")
            }
    )
    @DeleteMapping("/delete-scheduled/{transactionId}")
    public ResponseEntity<?> deleteScheduledTransaction(@PathVariable UUID transactionId, @PathVariable String accountId) {
        transactionService.deleteScheduledTransaction(transactionId);
        return ResponseEntity.noContent().build();
    }

}
