package com.example.backend.controller;

import com.example.backend.dto.CreateAccountRequestDto;
import com.example.backend.exception.custom.AccountNotFoundException;
import com.example.backend.exception.custom.UserUnauthorizedException;
import com.example.backend.model.Account;
import com.example.backend.model.Currency;
import com.example.backend.model.User;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.BankAccountType;
import com.example.backend.model.enums.CurrencyAbbrevation;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.http.MediaType;

@WebMvcTest(controllers = AccountController.class)
@Import(AccountControllerTest.TestSecurityConfig.class)
class AccountControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private AccountService accountService;

    private final UUID ACCOUNT_ID = UUID.randomUUID();
    private final String USER_ID = "user-123";

    private Account sampleAccount() {
        User u = new User();
        u.setId(USER_ID);
        Account a = new Account();
        a.setId(ACCOUNT_ID);
        a.setAccountNumber("1337-000000001");
        a.setBalance(42.5);
        a.setStatus(AccountStatus.ACTIVE);
        a.setCreatedAt(LocalDate.of(2025,1,1));
        a.setUser(u);
        return a;
    }

    @TestConfiguration
    static class TestSecurityConfig {
        @Bean
        JwtDecoder jwtDecoder() {
            return token -> Jwt.withTokenValue(token)
                    .header("alg", "none")
                    .subject("clerk-user-123")
                    .build();
        }
    }

    @Test
    @DisplayName("GET /api/account/{id} — 200 OK")
    void whenGetAccount_withValidId_returns200() throws Exception {
        Account acct = sampleAccount();
        Mockito.when(accountService.getAccount(eq(ACCOUNT_ID), eq(USER_ID)))
                .thenReturn(acct);

        mvc.perform(get("/api/account/{id}", ACCOUNT_ID)
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID)))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(ACCOUNT_ID.toString()))
                .andExpect(jsonPath("$.accountNumber").value("1337-000000001"))
                .andExpect(jsonPath("$.balance").value(42.5))
                .andExpect(jsonPath("$.status").value("ACTIVE"))
                .andExpect(jsonPath("$.createdAt").value("2025-01-01"));
    }

    @Test
    @DisplayName("GET /api/account/{id} — 404 Not Found")
    void whenGetAccount_notFound_throws404() throws Exception {
        Mockito.when(accountService.getAccount(eq(ACCOUNT_ID), eq(USER_ID)))
                .thenThrow(new AccountNotFoundException());

        mvc.perform(get("/api/account/{id}", ACCOUNT_ID)
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID))))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/account/{id} — 401 Unauthorized")
    void whenGetAccount_unauthorized_throws401() throws Exception {
        Mockito.when(accountService.getAccount(eq(ACCOUNT_ID), eq(USER_ID)))
                .thenThrow(new UserUnauthorizedException(""));

        mvc.perform(get("/api/account/{id}", ACCOUNT_ID)
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/account — 200 OK with accounts")
    void whenGetAllUserAccounts_withAccounts_returns200() throws Exception {
        Account acct1 = sampleAccount();
        Account acct2 = sampleAccount();
        acct2.setId(UUID.randomUUID());
        Mockito.when(accountService.getAllUserAccounts(eq(USER_ID)))
                .thenReturn(List.of(acct1, acct2));

        mvc.perform(get("/api/account")
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID)))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accounts").isArray())
                .andExpect(jsonPath("$.accounts.length()").value(2))
                .andExpect(jsonPath("$.accounts[0].id").value(acct1.getId().toString()))
                .andExpect(jsonPath("$.accounts[1].id").value(acct2.getId().toString()));
    }

    @Test
    @DisplayName("GET /api/account — 200 OK with empty list")
    void whenGetAllUserAccounts_noAccounts_returnsEmptyArray() throws Exception {
        mvc.perform(get("/api/account")
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accounts").isArray())
                .andExpect(jsonPath("$.accounts").isEmpty());
    }

    @Test
    @DisplayName("GET /api/account/{id}/balance — 200 OK")
    void whenGetBalance_valid_returns200() throws Exception {
        double bal = 123.45;
        Mockito.when(accountService.getBalance(eq(ACCOUNT_ID), eq(USER_ID)))
                .thenReturn(bal);

        mvc.perform(get("/api/account/{id}/balance", ACCOUNT_ID)
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID)))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.balance").value(bal))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @DisplayName("GET /api/account/{id}/balance — 401 Unauthorized")
    void whenGetBalance_unauthorized_returns401() throws Exception {
        Mockito.when(accountService.getBalance(eq(ACCOUNT_ID), eq(USER_ID)))
                .thenThrow(new UserUnauthorizedException(""));

        mvc.perform(get("/api/account/{id}/balance", ACCOUNT_ID)
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/account/{id}/balance — 404 Not Found")
    void whenGetBalance_notFound_returns404() throws Exception {
        Mockito.when(accountService.getBalance(eq(ACCOUNT_ID), eq(USER_ID)))
                .thenThrow(new AccountNotFoundException());

        mvc.perform(get("/api/account/{id}/balance", ACCOUNT_ID)
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID))))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/account — 201 Created")
    void whenCreateAccount_validInput_returns201() throws Exception {
        // --- Arrange ---
        // stub userService to return a User
        User user = new User();
        user.setId(USER_ID);
        Mockito.when(userService.getUser(eq(USER_ID)))
                .thenReturn(user);

        // stub accountService to return an Account with a new ID
        Account created = sampleAccount();
        Mockito.when(accountService.createAccount(any(Account.class)))
                .thenReturn(created);

        // build JSON payload
        Map<String, Object> payload = Map.of(
                "type", BankAccountType.PERSONAL.name(),
                "currency", Map.of("abbrevation", CurrencyAbbrevation.SEK.name())
        );
        String json = objectMapper.writeValueAsString(payload);

        // --- Act & Assert ---
        mvc.perform(post("/api/account")
                        .with(jwt().jwt(jwt -> jwt.subject(USER_ID)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "api/account/" + created.getId()))
                .andExpect(content().string(""));  // no body

        // --- Verify that the Account passed into service has the right fields ---
        ArgumentCaptor<Account> captor = ArgumentCaptor.forClass(Account.class);
        Mockito.verify(accountService).createAccount(captor.capture());
        Account toCreate = captor.getValue();
        assertThat(toCreate.getUser().getId()).isEqualTo(USER_ID);
        assertThat(toCreate.getType()).isEqualTo(BankAccountType.PERSONAL);
        assertThat(toCreate.getCurrency().getAbbrevation())
                .isEqualTo(CurrencyAbbrevation.SEK);
    }
}