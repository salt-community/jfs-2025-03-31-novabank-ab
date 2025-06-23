package com.example.backend.dto.loanDto.response;

import com.example.backend.model.Loan;
import org.springframework.data.domain.Page;
import java.util.List;

public record ListLoanResponseDto(
        List<LoanResponseDto> loans,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
    public static ListLoanResponseDto fromLoanPage(Page<Loan> loanPage) {
        return new ListLoanResponseDto(
                loanPage.getContent().stream()
                        .map(LoanResponseDto::fromLoan)
                        .toList(),
                loanPage.getNumber(),
                loanPage.getSize(),
                loanPage.getTotalElements(),
                loanPage.getTotalPages()
        );
    }
}
