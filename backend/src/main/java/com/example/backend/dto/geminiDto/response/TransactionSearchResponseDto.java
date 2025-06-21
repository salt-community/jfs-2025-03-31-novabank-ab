package com.example.backend.dto.geminiDto.response;

import java.util.List;
import java.util.UUID;

public record TransactionSearchResponseDto(
        List<UUID> matchingTransactionIds
) {}