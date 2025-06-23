package com.example.backend.dto.loanDto.request;

//överväg i framtiden att samla alla riksbank-dto i en mapp
//skulle kunna hardcode för enklare hantering men tänker på scalability
public record RiksbankRateRequestDto (
        String seriesCode
) {}
