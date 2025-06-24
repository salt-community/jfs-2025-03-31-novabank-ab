package com.example.backend.dto.loanDto.response;

import com.example.backend.dto.accountDto.response.AccountResponseDto;
import com.example.backend.model.Loan;
import com.example.backend.model.enums.LoanStatus;

import java.time.LocalDate;

public record LoanResponseDto(
    AccountResponseDto account,
    double interestRate,
    double originalAmount,
    double remainingAmount,
    LocalDate startDate,
    LocalDate dueDate,
    LoanStatus status
) {
    public static LoanResponseDto fromLoan(Loan loan) {
        return new LoanResponseDto(
                AccountResponseDto.fromAccount(loan.getAccount()),
                loan.getInterestRate(),
                loan.getOriginalAmount(),
                loan.getRemainingAmount(),
                loan.getStartDate(),
                loan.getDueDate(),
                loan.getStatus()
        );
    }
}
