package com.example.backend.dto.geminiDto.request;

import java.util.List;

public record TransactionSearchRequestDto(
        String query,
        List<TransactionSearchInputDto> transactions
) {}
