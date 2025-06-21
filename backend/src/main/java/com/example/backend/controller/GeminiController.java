package com.example.backend.controller;

import com.example.backend.dto.geminiDto.request.ClassifyTransactionRequestDto;
import com.example.backend.dto.geminiDto.request.TransactionSearchRequestDto;
import com.example.backend.dto.geminiDto.response.CategoryResponseDto;
import com.example.backend.dto.geminiDto.response.TransactionSearchResponseDto;
import com.example.backend.model.Transaction;
import com.example.backend.service.GeminiService;
import com.example.backend.service.TransactionService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/gemini", "/api/gemini/"})
@RequiredArgsConstructor
public class GeminiController {

    private final GeminiService geminiService;
    private final TransactionService transactionService;

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
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @RequestBody TransactionSearchRequestDto dto) {
        String userId = jwt.getSubject();
        List<Transaction> allUserTransactions = transactionService.getAllTransactionsByUserNoPagination(userId);
        List<UUID> matchingIds = geminiService.searchRelevantTransactions(dto.query(), userId, allUserTransactions);
        return ResponseEntity.ok(new TransactionSearchResponseDto(matchingIds));
    }

}
