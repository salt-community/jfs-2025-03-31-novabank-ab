package com.example.backend.dto.loanDto.response;

import com.example.backend.model.Loan;

import java.util.List;

public record ListLoanResponseDto(
        List<LoanResponseDto> loans
) {
    public static ListLoanResponseDto fromLoans(List<Loan> loanList) {
        return new ListLoanResponseDto(
                loanList.stream()
                        .map(LoanResponseDto::fromLoan)
                        .toList()
        );
    }
}
