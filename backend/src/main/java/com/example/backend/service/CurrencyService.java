package com.example.backend.service;

import com.example.backend.dto.currencyDto.response.ExchangeRateResponseDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CurrencyService {

    private final RestTemplate restTemplate;


    /* TODO sync with env
    TODO secondly work with scalability for other currencies
    TODO check whether to add each currency or fix fancy formula
     */
    private final String API_URL = "";
    private final String API_KEY = "";

    public CurrencyService() {
        this.restTemplate = new RestTemplate();

    }

    //TODO consider adding caching in future
    public ExchangeRateResponseDto fetchRateDto() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Ocp-Apim-Subscription-Key", API_KEY);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<ExchangeRateResponseDto> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.GET,
                    entity,
                    ExchangeRateResponseDto.class
            );

            return response.getBody();

        } catch (Exception e) {
            throw new RuntimeException("Error fetching exchange rate.", e);
        }
    }

    public double convertSekToEur(double sek) {
        double rate = fetchRateDto().getValue();
        return sek/rate;
    }

    public double convertEurToSek(double eur) {
        double rate = fetchRateDto().getValue();
        return eur * rate;
    }
}
