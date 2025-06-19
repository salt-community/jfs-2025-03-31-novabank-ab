package com.example.backend.dto.transactionDto.request;

import com.example.backend.exception.custom.InvalidAccountNumberException;
import com.example.backend.exception.custom.InvalidTransactionDateException;
import com.example.backend.model.*;
import com.example.backend.model.enums.PaymentType;
import com.example.backend.model.enums.TransactionStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public record ClientTransactionRequestDto(
    @NotNull
    String fromAccountNo,
    @NotNull
    String toClientNo,
    @NotNull
    PaymentType type,
    @NotNull
    LocalDate transactionDate,
    @NotNull
    @Positive
    double amount,
    @NotNull
    String description,
    @NotNull
    String userNote,
    String ocrNumber
) {
    private static final Pattern pattern = Pattern.compile("[A-Z]{2}[0-9]{10}", Pattern.CASE_INSENSITIVE);

    private void validate(Account fromAccount, Client toClient, LocalDate transactionDate) {
        if (!Objects.equals(fromAccount.getAccountNumber(), fromAccountNo)) throw new IllegalArgumentException("Invalid account number");
        if (!Objects.equals(toClient.getAccountNumber(), toClientNo)) throw new IllegalArgumentException("Invalid client number");
        if (transactionDate.atStartOfDay().isBefore(LocalDate.now().atStartOfDay())) throw new InvalidTransactionDateException();
        Matcher clientMatcher = pattern.matcher(toClient.getAccountNumber());
        if (!clientMatcher.matches()) throw new InvalidAccountNumberException("Client account number is invalid");

    }

    public ClientTransaction toClientTransaction(Account fromAccount, Client toClient) {
        validate(fromAccount, toClient, transactionDate);
        return new ClientTransaction(
            null,
            fromAccount,
            toClient,
            type,
            LocalDateTime.now(),
            amount,
            description,
            userNote,
            ocrNumber
        );
    }
    public ClientScheduledTransaction toClientScheduledTransaction(Account fromAccount, Client toClient) {
        validate(fromAccount, toClient, transactionDate);
        return new ClientScheduledTransaction(
            null,
            fromAccount,
            toClient,
            type,
            amount,
            transactionDate.atStartOfDay(),
            TransactionStatus.PENDING,
            LocalDateTime.now(),
            ocrNumber,
            userNote,
            description
        );
    }
}
