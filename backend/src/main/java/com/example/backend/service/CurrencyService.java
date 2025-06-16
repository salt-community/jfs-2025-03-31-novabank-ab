package com.example.backend.service;

import com.example.backend.dto.currencyDto.response.ExchangeRateResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CurrencyService {

    private final RestTemplate restTemplate;
    private final String API_URL;
    private final String API_KEY;

    public CurrencyService(
            @Value("${RIKSBANK_API_URL}") String apiUrl,
            @Value("${RIKSBANK_API_KEY}") String apiKey
    ) {
        this.restTemplate = new RestTemplate();
        this.API_URL = apiUrl;
        this.API_KEY = apiKey;
    }

    public double convert(String from, String to, double amount) {
        double rate = getEffectiveRate(from, to);
        return amount * rate;
    }
    
    //TODO consider adding caching in future
    public ExchangeRateResponseDto getRateFromApi(String seriesCode) {

        String url = API_URL + "/swea/v1/Observations/Latest/" + seriesCode;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Ocp-Apim-Subscription-Key", API_KEY);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<ExchangeRateResponseDto> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    ExchangeRateResponseDto.class
            );

            return response.getBody();

        } catch (Exception e) {
            throw new RuntimeException("Error fetching exchange rate from API.", e);
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
                throw new RuntimeException("Could not fetch exchange rate: " + from + " to " + to);
            }
        }

        double rate = dto.getValue();
        return new ExchangeRateResponseDto(dto.getDate(), inverted ? (1 / rate) : rate);
    }

    public String getCurrencyPairCode(String fromCurrency, String toCurrency) {
        return (fromCurrency + toCurrency + "pmi").toLowerCase();
    }


}
