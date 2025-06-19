package com.example.backend.dto.geminiDto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


public record GeminiResponseDto(List<Candidate> candidates) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Candidate(
            Content content
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Content(
            List<Part> parts
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Part(
            String text
    ) {}

}