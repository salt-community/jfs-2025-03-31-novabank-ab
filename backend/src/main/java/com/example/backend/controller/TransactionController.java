package com.example.backend.controller;

import com.example.backend.dto.CombinedTransactionResponseDto;
import com.example.backend.dto.transactionDto.request.TransactionRequestDto;
import com.example.backend.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getTransaction(@PathVariable UUID transactionId,
                                            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return ResponseEntity.ok().body(transactionService.getTransaction(transactionId, userId));
    }

    @Operation(
            summary = "Retrieve all transactions for a specific account",
            description = "Returns all transactions where the specified account is either the sender (fromAccount) or the receiver (toAccount)."
    )
    @GetMapping("/{accountId}/transaction-history")
    public ResponseEntity<CombinedTransactionResponseDto> getAllTransactions(@PathVariable UUID accountId,
                                                                             @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return ResponseEntity.ok().body(transactionService.getAllTransactions(accountId, userId));
    }

    @Operation(
            summary = "Create a new transaction",
            description = "Adds a new immediate transaction to the database based on the provided request data.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Scheduled transaction successfully created"),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "404", description = "Account not found"),
                    @ApiResponse(responseCode = "403", description = "One of the account is not active")
            }
    )
    @PostMapping
    public ResponseEntity<?> addTransaction(@RequestBody TransactionRequestDto dto) {
//        transactionService.addTransaction(dto);
        return ResponseEntity.ok().build();
    }

  /*  @Operation(
            summary = "Create a scheduled transaction",
            description = "Adds a new scheduled (future-dated) transaction to the system based on the provided request data.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Scheduled transaction successfully created"),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "404", description = "Account not found"),
                    @ApiResponse(responseCode = "403", description = "One of the account is not active")
            }
    )
    @PostMapping("/create-scheduled")
    public ResponseEntity<?> addScheduledTransaction(@RequestBody ScheduledRequestDto dto) {
//        transactionService.addScheduledTransaction(UUID.fromString(accountId),dto);
        return ResponseEntity.ok().build();
    }*/

    // TODO: Remove accountId and Change to set Status.CANCELED instead of Delete
    @Operation(
            summary = "Cancel a scheduled transaction",
            description = "Deletes (cancels) a specific scheduled transaction for the given account.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Scheduled transaction cancelled successfully"),
                    @ApiResponse(responseCode = "403", description = "Transaction does not belong to the given account"),
                    @ApiResponse(responseCode = "404", description = "Account or scheduled transaction not found")}
    )
    @DeleteMapping("/cancel-scheduled/{accountId}/{transactionId}")
    public ResponseEntity<?> deleteScheduledTransaction(@PathVariable UUID accountId, @PathVariable UUID transactionId) {
        String userId ="mock";
        transactionService.deleteScheduledTransaction(accountId, transactionId,userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Get a specific scheduled transaction",
            description = "Retrieves details of a specific scheduled transaction for the given account.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Scheduled transaction retrieved successfully"),
                    @ApiResponse(responseCode = "403", description = "Transaction does not belong to the given account"),
                    @ApiResponse(responseCode = "404", description = "Account or scheduled transaction not found")
            }

    )
    @GetMapping("/scheduled-transaction/{accountId}/{transactionId}")
    public ResponseEntity<?> getScheduledTransaction(@PathVariable UUID accountId, @PathVariable UUID transactionId) {
        return ResponseEntity.ok(transactionService.getScheduledTransaction(accountId, transactionId,"mock"));
    }

  /*  @Operation(
            summary = "Get all scheduled transactions for an account",
            description = "Fetches a list of all scheduled transactions belonging to the given account.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "List of scheduled transactions retrieved successfully"),
                    @ApiResponse(responseCode = "404", description = "Account not found")
            }
    )
    @GetMapping("scheduled-transactions/{accountId}")
    public ResponseEntity<?> getScheduledTransactions(@PathVariable String accountId) {
        return ResponseEntity.ok().body(transactionService.getScheduledTransactions(UUID.fromString(accountId)));
    }*/

}
