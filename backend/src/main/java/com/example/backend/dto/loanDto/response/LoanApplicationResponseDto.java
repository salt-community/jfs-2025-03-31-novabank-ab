package com.example.backend.dto.loanDto.response;

import com.example.backend.model.Account;
import com.example.backend.model.LoanApplication;
import com.example.backend.model.User;
import com.example.backend.model.enums.ApplicationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record LoanApplicationResponseDto(
        LocalDateTime createdAt,
        ApplicationStatus status,
        User user,
        Account account,
        double amount,
        double interestRate,
        LocalDate requestedDueDate,
        String note
) {
    public static LoanApplicationResponseDto fromApplication(LoanApplication application) {
        return new LoanApplicationResponseDto(
                application.getCreatedAt(),
                application.getStatus(),
                application.getUser(),
                application.getAccount(),
                application.getRequestedAmount(),
                application.getInterestRate(),
                LocalDate.now().plusMonths(application.getRepaymentMonths()),
                application.getNote()
        );
    }
}
