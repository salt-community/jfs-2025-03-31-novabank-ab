package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CurrencyService {

    private final WebClient webClient;
    private final String API_URL = "";
    private final String API_KEY = "";

    public CurrencyService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.riksbank.se")
                .defaultHeader("Ocp-Apim-Subscription-Key", API_KEY)
                .build();
    }

    public double fetchSekEurPmi() {

    }



}
