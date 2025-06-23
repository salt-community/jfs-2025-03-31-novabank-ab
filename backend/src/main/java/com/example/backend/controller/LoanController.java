package com.example.backend.controller;

import com.example.backend.dto.accountDto.response.AccountResponseDto;
import com.example.backend.dto.loanDto.request.LoanApplicationRequestDto;
import com.example.backend.dto.loanDto.response.ListLoanResponseDto;
import com.example.backend.dto.loanDto.response.LoanResponseDto;
import com.example.backend.model.Account;
import com.example.backend.model.Loan;
import com.example.backend.model.LoanApplication;
import com.example.backend.model.User;
import com.example.backend.model.enums.LoanStatus;
import com.example.backend.service.AccountService;
import com.example.backend.service.LoanService;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/loan", "/api/loan/"})
public class LoanController {

    private final LoanService loanService;
    private final UserService userService;
    private final AccountService accountService;

    public LoanController(LoanService loanService, UserService userService, AccountService accountService) {
        this.loanService = loanService;
        this.userService = userService;
        this.accountService = accountService;
    }

    @Operation(summary = "Create a new loan from application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Loan successfully created"),
            @ApiResponse(responseCode = "404", description = "Application not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected error")
    })
    @PostMapping("/from-application/{applicationId}")
    public ResponseEntity<Void> createLoanFromApplication(@PathVariable UUID applicationId) {
        Loan loan = loanService.createLoanFromApplication(applicationId);
        URI location = URI.create("/api/loan/" + loan.getId());
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get loan by ID")
    @GetMapping("/{loanId}")
    public ResponseEntity<LoanResponseDto> getLoan(@PathVariable UUID loanId) {
        return ResponseEntity.ok(LoanResponseDto.fromLoan(loanService.getLoanById(loanId)));
    }

    @Operation(summary = "Get all loans")
    @GetMapping
    public ResponseEntity<ListLoanResponseDto> getAllLoans(Pageable pageable) {
        Page<Loan> page = loanService.getAllLoans(pageable);
        return ResponseEntity.ok(ListLoanResponseDto.fromLoanPage(page));
    }

    @Operation(summary = "Update loan status")
    @PutMapping("/{loanId}/status")
    public ResponseEntity<LoanResponseDto> updateLoanStatus(@PathVariable UUID loanId, @RequestParam LoanStatus status) {
        Loan loan = loanService.updateLoanStatus(loanId, status);
        return ResponseEntity.ok(LoanResponseDto.fromLoan(loan));
    }

    @Operation(summary = "Create loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Application created"),
            @ApiResponse(responseCode = "400", description = "Validation failed")
    })
    @PostMapping("/application")
    public ResponseEntity<Void> createLoanApplication(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @RequestBody LoanApplicationRequestDto dto
    ) {
        User user = userService.getUser(jwt.getSubject());
        Account account = accountService.getAccountByAccountNo(dto.accountId(), user.getId());
        LoanApplication created = loanService.createLoanApplication(LoanApplicationRequestDto.toApplication(dto, user, account));
        URI location = URI.create("/api/loan/application/" + created.getId());
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Get loan application by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found application"),
            @ApiResponse(responseCode = "404", description = "Not found")
    })
    @GetMapping("/application/{id}")
    public ResponseEntity<LoanApplication> getApplication(@PathVariable UUID id) {
        return ResponseEntity.ok(loanService.getLoanApplicationById(id));
    }
}
