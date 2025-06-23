package com.example.backend.dto.loanDto.request;

import com.example.backend.model.Account;
import com.example.backend.model.LoanApplication;
import com.example.backend.model.User;
import com.example.backend.model.enums.ApplicationStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record LoanApplicationRequestDto(
        UUID accountId,
        double amount,
        String note,
        int requestedMonths
) {
    private static final double MIN_RATE = 1.7;
    private static final double MAX_RATE = 5.0;

    public static LoanApplication toApplication(LoanApplicationRequestDto dto, User user, Account account) {
        LoanApplication application = new LoanApplication();
        application.setCreatedAt(LocalDateTime.now());
        application.setNote(dto.note());
        application.setRequestedAmount(dto.amount());
        application.setStatus(ApplicationStatus.PENDING);
        application.setUser(user);
        application.setAccount(account);
        application.setInterestRate(MIN_RATE + (Math.random() * (MAX_RATE - MIN_RATE)));
        application.setRepaymentMonths(dto.requestedMonths());
        return application;
    }
}
