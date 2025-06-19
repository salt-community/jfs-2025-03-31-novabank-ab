package com.example.backend.service;

import com.example.backend.dto.geminiDto.response.GeminiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    private static final String URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    private final RestTemplate restTemplate = new RestTemplate();

    public String classifyTransaction(String description, double amount, String recipient) {
        Map<String, Object> requestBody = getClassifyTransactionBody(description, amount, recipient);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            String fullUrl = URL + "?key=" + apiKey;
            ResponseEntity<GeminiResponseDto> response = restTemplate.exchange(
                    fullUrl,
                    HttpMethod.POST,
                    entity,
                    GeminiResponseDto.class
            );

            List<GeminiResponseDto.Candidate> candidates = Objects.requireNonNull(response.getBody()).candidates();
            if (candidates != null && !candidates.isEmpty()) {
                return candidates.getFirst().content().parts().getFirst().text().trim().toLowerCase();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "unknown";
    }

    private static Map<String, Object> getClassifyTransactionBody(String description, double amount, String recipient) {
        String prompt = """
            You are classifying a bank transaction for a Swedish user.
            Use Swedish context and common transaction patterns in Sweden when assigning a category.
        
            Classify the following transaction into exactly one of these categories:
            [food, leisure, utilities, rent, salary, travel, other].
        
            If you are unsure, guess the most likely category based on the available information.
            Do not explain your answer. Only return the category name in lowercase.
        
            Transaction:
            - Description: %s
            - Amount: %.2f
            - Recipient: %s
        
            Category:
            """.formatted(description, amount, recipient != null ? recipient : "unknown");

        return Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );
    }
}
