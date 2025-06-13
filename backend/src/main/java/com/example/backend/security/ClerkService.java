package com.example.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class ClerkService {
    @Value("${clerk.api.secret}")
    private String clerkSecretKey;

    private final RestTemplate restTemplate;

    public ClerkService() {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
        this.restTemplate = new RestTemplate(factory);
    }

    public void setUserRole(String userId, String role) {
        String url = "https://api.clerk.com/v1/users/" + userId;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(clerkSecretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "public_metadata", Map.of("role", role)
        );
        HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, headers);

        restTemplate.exchange(url, HttpMethod.PATCH, req, Void.class);
    }
}
