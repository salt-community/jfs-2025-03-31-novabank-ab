package com.example.backend.controller;

import com.example.backend.dto.transactionDto.response.CombinedTransactionResponseDto;
import com.example.backend.dto.transactionDto.request.TransactionRequestDto;
import com.example.backend.dto.transactionDto.response.ListUnifiedTransactionResponseDto;
import com.example.backend.dto.transactionDto.response.UnifiedTransactionResponseDto;
import com.example.backend.model.Transaction;
import com.example.backend.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/account/transaction", "/api/account/transaction/"})
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService service) {
        this.transactionService = service;
    }

    @Operation(
            summary = "Retrieve a specific transaction by ID",
            description = "Fetches a single transaction from the database using its unique identifier (UUID)."
    )
    @GetMapping("/{transactionId}")
    public ResponseEntity<UnifiedTransactionResponseDto> getTransaction(@PathVariable UUID transactionId,
                                                                        @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return ResponseEntity.ok().body(transactionService.getTransaction(transactionId, userId));
    }

    @Operation(
            summary = "Retrieve all transactions for a specific account",
            description = "Returns all transactions where the specified account is either the sender (fromAccount) or the receiver (toAccount)."
    )
    @GetMapping("/{accountId}")
    public ResponseEntity<CombinedTransactionResponseDto> getAllTransactionsForOneAccount(@PathVariable UUID accountId,
                                                                             @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return ResponseEntity.ok().body(transactionService.getAllTransactionsByAccount(accountId, userId));
    }

    @Operation(
            summary = "Retrieve all transactions for a specific user",
            description = "Returns all transactions where the specified user is either the sender (fromUser) or the receiver (toUser)."
    )
    @GetMapping
    public ResponseEntity<ListUnifiedTransactionResponseDto> getAllTransactionsByUser(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        List<Transaction> transactions = transactionService.getTransactionsByUser(userId);
        return ResponseEntity.ok().body(ListUnifiedTransactionResponseDto.fromTransactions(transactions));
    }

    @Operation(
            summary = "Create a new transaction",
            description = "Adds a transaction to the database based on the provided request data.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Scheduled transaction successfully created"),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "403", description = "One of the account is not active"),
                    @ApiResponse(responseCode = "404", description = "Account not found")
            }
    )
    @PostMapping
    public ResponseEntity<Void> addTransaction(@RequestBody TransactionRequestDto dto, @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        transactionService.addTransaction(dto,userId);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Cancel a scheduled transaction",
            description = "Deletes (cancels) a specific scheduled transaction for the given account.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Scheduled transaction cancelled successfully"),
                    @ApiResponse(responseCode = "403", description = "Transaction does not belong to the given account"),
                    @ApiResponse(responseCode = "404", description = "Account or scheduled transaction not found")}
    )
    @DeleteMapping("/cancel-scheduled/{transactionId}")
    public ResponseEntity<Void> deleteScheduledTransaction( @PathVariable UUID transactionId,@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        transactionService.deleteScheduledTransaction(transactionId,userId);
        return ResponseEntity.noContent().build();
    }
}
