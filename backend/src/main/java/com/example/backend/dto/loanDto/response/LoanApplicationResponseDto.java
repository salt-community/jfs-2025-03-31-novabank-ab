package com.example.backend.dto.loanDto.response;

import com.example.backend.dto.accountDto.response.AccountResponseDto;
import com.example.backend.dto.userDto.response.UserResponseDTO;
import com.example.backend.model.Account;
import com.example.backend.model.LoanApplication;
import com.example.backend.model.User;
import com.example.backend.model.enums.ApplicationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record LoanApplicationResponseDto(
        UUID id,
        LocalDateTime createdAt,
        ApplicationStatus status,
        UserResponseDTO user,
        AccountResponseDto account,
        double amount,
        double interestRate,
        LocalDate requestedDueDate,
        String note
) {
    public static LoanApplicationResponseDto fromApplication(LoanApplication application) {
        return new LoanApplicationResponseDto(
                application.getId(),
                application.getCreatedAt(),
                application.getStatus(),
                UserResponseDTO.fromUser(application.getUser()),
                AccountResponseDto.fromAccount(application.getAccount()),
                application.getRequestedAmount(),
                application.getInterestRate(),
                LocalDate.now().plusMonths(application.getRepaymentMonths()),
                application.getNote()
        );
    }
}
