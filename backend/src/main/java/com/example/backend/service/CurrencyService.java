package com.example.backend.service;

import com.example.backend.dto.currencyDto.request.CurrencyConversionRequestDto;
import com.example.backend.dto.currencyDto.response.CurrencyConversionResultDto;
import com.example.backend.dto.currencyDto.response.ExchangeRateResponseDto;
import com.example.backend.exception.custom.CurrencyConversionException;
import com.example.backend.exception.custom.InvalidCurrencyException;
import com.example.backend.model.Currency;
import com.example.backend.model.enums.CurrencyAbbrevation;
import com.example.backend.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CurrencyService {

    private final CurrencyRepository currencyRepository;
    private final RestTemplate restTemplate;
    private final String API_URL;
    private final String API_KEY;

    public CurrencyService(CurrencyRepository currencyRepository,
            @Value("${RIKSBANK_API_URL}") String apiUrl,
            @Value("${RIKSBANK_API_KEY}") String apiKey
    ) {
        this.currencyRepository = currencyRepository;
        this.restTemplate = new RestTemplate();
        this.API_URL = apiUrl;
        this.API_KEY = apiKey;
    }

    public Currency getCurrencyFromAbbrevation(CurrencyAbbrevation abb) {
        return currencyRepository.findByAbbrevation(abb).orElseThrow(InvalidCurrencyException::new);
    }


    public CurrencyConversionResultDto convertCurrency(CurrencyConversionRequestDto requestDto) {

        String fromCurrency = requestDto.fromCurrency();
        String toCurrency = requestDto.toCurrency();
        double originalAmount = requestDto.amount();

        ExchangeRateResponseDto exchangeRateDto = getEffectiveRate(fromCurrency, toCurrency);
        double rate = exchangeRateDto.value();
        double convertedAmount = originalAmount * rate;

        return new CurrencyConversionResultDto(
                fromCurrency,
                toCurrency,
                originalAmount,
                convertedAmount,
                rate,
                exchangeRateDto.date()
        );
    }
    
    //TODO consider adding caching in future
    public ExchangeRateResponseDto getRateFromApi(String seriesCode) {
        String url = API_URL + "/swea/v1/Observations/Latest/" + seriesCode;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Ocp-Apim-Subscription-Key", API_KEY);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<ExchangeRateResponseDto> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    ExchangeRateResponseDto.class
            );

            ExchangeRateResponseDto dto = response.getBody();

            if (dto == null || dto.value() == 0) {
                throw new CurrencyConversionException("No valid data returned from external API for series: " + seriesCode);
            }

            return dto;

        } catch (CurrencyConversionException e) {
            throw e;
        } catch (Exception e) {
            throw new CurrencyConversionException("Failed to fetch exchange rate for series: " + seriesCode, e);
        }
    }


    public ExchangeRateResponseDto getEffectiveRate(String from, String to) {
        String directCode = getCurrencyPairCode(from, to);
        String inverseCode = getCurrencyPairCode(to, from);

        ExchangeRateResponseDto dto;
        boolean inverted = false;

        try {
            dto = getRateFromApi(directCode);
        } catch (Exception e) {
            try {
                dto = getRateFromApi(inverseCode);
                inverted = true;
            } catch (Exception ex) {
                throw new CurrencyConversionException("Unsupported currency pair: " + from + " to " + to);
            }
        }

        double rate = dto.value();
        return new ExchangeRateResponseDto(dto.date(), inverted ? (1 / rate) : rate);
    }

    public String getCurrencyPairCode(String fromCurrency, String toCurrency) {
        return (fromCurrency + toCurrency + "pmi").toLowerCase();
    }


}
