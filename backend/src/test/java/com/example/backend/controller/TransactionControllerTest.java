//package com.example.backend.controller;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.eq;
//import static org.mockito.Mockito.*;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Map;
//import java.util.UUID;
//
//import com.example.backend.dto.RegisterUserRequestDto;
//import com.example.backend.dto.TransactionRequestDto;
//import com.example.backend.exception.custom.TransactionNotFoundException;
//import com.example.backend.model.Transaction;
//import com.example.backend.model.User;
//import com.example.backend.model.enums.Role;
//import com.example.backend.model.enums.UserStatus;
//import com.example.backend.service.TransactionService;
//import com.example.backend.service.UserService;
//
//import org.junit.jupiter.api.Disabled;
//import org.junit.jupiter.api.Test;
//import org.mockito.ArgumentCaptor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Import;
//import org.springframework.http.MediaType;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.jwt.JwtDecoder;
//import org.springframework.test.context.bean.override.mockito.MockitoBean;
//import org.springframework.test.web.servlet.MockMvc;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//@Disabled
//@WebMvcTest(TransactionController.class)
//@Import(TransactionControllerTest.TestSecurityConfig.class)
//class TransactionControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @MockitoBean
//    private TransactionService transactionService;
//
//    @TestConfiguration
//    static class TestSecurityConfig {
//        @Bean
//        JwtDecoder jwtDecoder() {
//            return token -> Jwt.withTokenValue(token)
//                    .header("alg", "none")
//                    .subject(token)
//                    .build();
//        }
//    }
//
//    @Test
//    void getTransaction_asOwner_returns200() throws Exception {
//        String accountId = "owner-123";
//        UUID txId = UUID.randomUUID();
//
//        Transaction tx = new Transaction();
//        tx.setId(txId);
//        when(transactionService.getTransaction(txId, accountId)).thenReturn(tx);
//
//        Jwt ownerJwt = Jwt.withTokenValue(accountId)
//                .header("alg", "none")
//                .subject(accountId)
//                .build();
//
//        mockMvc.perform(get("/api/account/{accountId}/transaction/{transactionId}", accountId, txId)
//                        .with(jwt().jwt(ownerJwt))
//                )
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(txId.toString()));
//
//        verify(transactionService).getTransaction(txId);
//    }
//
//    @Test
//    void getAllTransactions_returnsList() throws Exception {
//        UUID accountId = UUID.randomUUID();
//
//        Transaction t1 = new Transaction();
//        t1.setId(UUID.randomUUID());
//        Transaction t2 = new Transaction();
//        t2.setId(UUID.randomUUID());
//
//        when(transactionService.getAllTransactions(accountId)).thenReturn(List.of(t1, t2));
//        Jwt ownerJwt = Jwt.withTokenValue(accountId.toString())
//                .header("alg", "none")
//                .subject(accountId.toString())
//                .build();
//
//        mockMvc.perform(get("/api/account/{accountId}/transaction/transaction-history", accountId)
//                        .with(jwt().jwt(ownerJwt)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(2))
//                .andExpect(jsonPath("$[0].id").value(t1.getId().toString()))
//                .andExpect(jsonPath("$[1].id").value(t2.getId().toString()));
//
//        verify(transactionService).getAllTransactions(accountId);
//    }
//
//    @Test
//    void addTransaction_invokesService_returns200() throws Exception {
//        UUID accountId = UUID.randomUUID();
//        TransactionRequestDto dto = new TransactionRequestDto(
//                UUID.randomUUID(),
//                123.45,
//                "Some description",
//                "User note",
//                "OCR123"
//        );
//        Jwt ownerJwt = Jwt.withTokenValue(accountId.toString())
//                .header("alg", "none")
//                .subject(accountId.toString())
//                .build();
//
//        mockMvc.perform(post("/api/account/{accountId}/transaction", accountId)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(dto))
//                        .with(jwt().jwt(ownerJwt)))
//                .andExpect(status().isOk());
//
//        verify(transactionService).addTransaction(eq(accountId), eq(dto));
//    }
//
//    @Test
//    void getTransaction_asNonOwner_forbidden() throws Exception {
//        String accountId = "owner-123";
//        UUID txId = UUID.randomUUID();
//
//        Jwt otherJwt = Jwt.withTokenValue("notowner-456")
//                .header("alg", "none")
//                .subject("notowner-456")
//                .build();
//
//        mockMvc.perform(get("/api/account/{accountId}/transaction/{transactionId}", accountId, txId)
//                        .with(jwt().jwt(otherJwt))
//                )
//                .andExpect(status().isForbidden());
//
//        verifyNoInteractions(transactionService);
//    }
//
//    @Test
//    void getTransaction_notFound_throwsNotFound() throws Exception {
//        String accountId = "owner-123";
//        UUID txId = UUID.randomUUID();
//        Jwt ownerJwt = Jwt.withTokenValue(accountId)
//                .header("alg", "none")
//                .subject(accountId)
//                .build();
//        when(transactionService.getTransaction(txId))
//                .thenThrow(new TransactionNotFoundException("Transaction not found"));
//
//        mockMvc.perform(get("/api/account/{accountId}/transaction/{transactionId}", accountId, txId)
//                        .with(jwt().jwt(ownerJwt)))
//                .andExpect(status().isNotFound());
//    }
//
//    @Test
//    void getTransaction_withMalformedUuids_returnsBadRequest() throws Exception {
//        String accountId = "owner-123";
//        Jwt ownerJwt = Jwt.withTokenValue(accountId)
//                .header("alg", "none")
//                .subject(accountId)
//                .build();
//        mockMvc.perform(get("/api/account/{accountId}/transaction/{transactionId}", "nope", "also-nope")
//                .with(jwt().jwt(ownerJwt)))
//                .andExpect(status().isBadRequest());
//    }
//}