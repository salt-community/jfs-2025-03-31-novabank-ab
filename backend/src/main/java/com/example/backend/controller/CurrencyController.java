package com.example.backend.controller;

import com.example.backend.dto.currencyDto.request.CurrencyConversionRequestDto;
import com.example.backend.dto.currencyDto.response.CurrencyConversionResultDto;
import com.example.backend.service.CurrencyService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/currency")
public class CurrencyController {

    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @Operation(summary = "Convert an amount from one currency to another",
            description = "Fetches the current exchange rate between two currencies " +
                    "and returns the converted amount, together with other relevant data " +
                    "such as current rate and date.")
    @PostMapping("/convert")
    public CurrencyConversionResultDto convert(@RequestBody CurrencyConversionRequestDto request) {
        return currencyService.convertCurrency(request);
    }

}
