package com.example.backend.dto.geminiDto.request;

public record ClassifyTransactionRequestDto(
        String description,
        double amount,
        String recipient
) { }