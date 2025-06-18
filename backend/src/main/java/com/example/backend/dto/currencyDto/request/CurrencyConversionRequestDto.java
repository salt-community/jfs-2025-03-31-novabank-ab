package com.example.backend.dto.currencyDto.request;

public record CurrencyConversionRequestDto(
        String fromCurrency,
        String toCurrency,
        double amount
) {}
