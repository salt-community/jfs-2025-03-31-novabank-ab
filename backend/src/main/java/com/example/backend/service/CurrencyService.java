package com.example.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

@Service
public class CurrencyService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    /* TODO sync with env
    TODO secondly work with scalability for other currencies
    TODO check whether to add each currency or fix fancy formula
     */
    private final String API_URL = "";
    private final String API_KEY = "";

    public CurrencyService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    //TODO consider adding caching in future
    public double fetchSekEurPmiRate() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Ocp-Apim-Subscription-Key", API_KEY);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());

            return root.get("value").asDouble(); // justera efter riktig responsstruktur

        } catch (Exception e) {
            throw new RuntimeException("Error fetching exchange rate.", e);
        }
    }

    public double convertSekToEur(double sek) {
        double rate = fetchSekEurPmiRate();
        return sek/rate;
    }

    public double convertEurToSek(double eur) {
        double rate = fetchSekEurPmiRate();
        return eur * rate;
    }
}
