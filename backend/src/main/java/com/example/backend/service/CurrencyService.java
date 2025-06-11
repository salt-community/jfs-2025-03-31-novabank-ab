package com.example.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CurrencyService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    // TODO sync with env
    // TODO secondly work with scalability for other currencies
    private final String API_URL = "";
    private final String API_KEY = "";

    public CurrencyService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.riksbank.se")
                .defaultHeader("Ocp-Apim-Subscription-Key", API_KEY)
                .build();

        this.objectMapper = new ObjectMapper();
    }

    //TODO consider adding caching in future
    public double fetchSekEurPmiRate() {
        try {
            String response = webClient.get()
                    .uri(API_URL)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(response);

            return root.get("value").asDouble();

        } catch (Exception e) {
            throw new RuntimeException("Error fetching exchange rate.");
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
