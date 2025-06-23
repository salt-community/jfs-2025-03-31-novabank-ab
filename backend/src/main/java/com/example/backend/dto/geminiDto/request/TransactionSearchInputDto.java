package com.example.backend.dto.geminiDto.request;

public record TransactionSearchInputDto(
        String id,
        String description,
        String userNote,
        double amount,
        String category
) {}