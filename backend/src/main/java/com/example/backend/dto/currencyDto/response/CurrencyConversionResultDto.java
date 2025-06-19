package com.example.backend.dto.currencyDto.response;

public record CurrencyConversionResultDto(
        String fromCurrency,
        String toCurrency,
        double originalAmount,
        double convertedAmount,
        double rateUsed,
        String rateDate
) {}
