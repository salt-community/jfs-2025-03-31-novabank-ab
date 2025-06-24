package com.example.backend.dto.loanDto.response;

import com.example.backend.model.LoanApplication;
import org.springframework.data.domain.Page;

import java.util.List;

public record ListLoanApplicationResponseDto(
        List<LoanApplicationResponseDto> loanApplications,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
    public static ListLoanApplicationResponseDto fromLoanApplicationPage(Page<LoanApplication> loanApplicationPage) {
        return new ListLoanApplicationResponseDto(
                loanApplicationPage.getContent().stream()
                        .map(LoanApplicationResponseDto::fromApplication)
                        .toList(),
                loanApplicationPage.getNumber(),
                loanApplicationPage.getSize(),
                loanApplicationPage.getTotalElements(),
                loanApplicationPage.getTotalPages()
        );
    }
}
