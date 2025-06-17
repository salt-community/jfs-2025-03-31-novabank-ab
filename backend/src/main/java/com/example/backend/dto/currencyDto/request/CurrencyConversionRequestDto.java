package com.example.backend.dto.currencyDto.request;

import lombok.Data;

@Data
public class CurrencyConversionRequestDto {
    private String fromCurrency;
    private String toCurrency;
    private double amount;
}