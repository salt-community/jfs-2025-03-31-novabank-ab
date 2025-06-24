package com.example.backend.dto.loanDto.response;

//överväg i framtiden att samla alla riksbank-dto i en mapp
public record RiksbankRateResponseDto(
        String date,
        double value
) {}
