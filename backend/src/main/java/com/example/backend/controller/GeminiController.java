package com.example.backend.controller;

import com.example.backend.dto.geminiDto.request.ClassifyTransactionRequestDto;
import com.example.backend.dto.geminiDto.request.TransactionSearchRequestDto;
import com.example.backend.dto.geminiDto.response.CategoryResponseDto;
import com.example.backend.dto.geminiDto.response.TransactionSearchResponseDto;
import com.example.backend.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/gemini", "/api/gemini/"})
@RequiredArgsConstructor
public class GeminiController {

    private final GeminiService geminiService;

    @PostMapping("/classify-transaction")
    public ResponseEntity<CategoryResponseDto> classify(@RequestBody ClassifyTransactionRequestDto dto) {
        String category = geminiService.classifyTransaction(
                dto.description(),
                dto.amount(),
                dto.recipient()
        );
        return ResponseEntity.ok(new CategoryResponseDto(category));
    }

    @PostMapping("/search-transactions")
    public ResponseEntity<TransactionSearchResponseDto> searchRelevantTransactions(
            @RequestBody TransactionSearchRequestDto dto) {

        List<UUID> matchingIds = geminiService.searchRelevantTransactions(dto.query(), dto.transactions());
        return ResponseEntity.ok(new TransactionSearchResponseDto(matchingIds));
    }

}
