package com.example.backend.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Map;
import java.util.UUID;

import com.example.backend.dto.adminDto.request.AddNewUserRequestDto;
import com.example.backend.model.User;
import com.example.backend.model.enums.Role;
import com.example.backend.model.enums.UserStatus;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = AdminController.class)
@Import(AdminControllerTest.TestSecurityConfig.class)
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private AccountService accountService;

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
    void addUser_success_createsAndReturnsLocation() throws Exception {
        UUID returnedId = UUID.randomUUID();
        User stubUser = new User();
        stubUser.setId(returnedId.toString());
        when(userService.addUser(any(User.class))).thenReturn(stubUser);

        AddNewUserRequestDto dto2= new AddNewUserRequestDto("Alice", "Smith", "alice@example.com", "555-1234", Role.ADMIN.toString());

        Jwt jwt = Jwt.withTokenValue("token")
                .header("alg", "none")
                .subject("clerk-user-123")
                .claim("metadata", Map.of("role", "ADMIN"))
                .build();

        mockMvc.perform(post("/api/admin/user")
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto2))
                )
                .andExpect(status().isCreated())
                .andExpect(header().string(
                        "Location", "/api/user/" + returnedId
                ));

        ArgumentCaptor<User> cap = ArgumentCaptor.forClass(User.class);
        verify(userService).addUser(cap.capture());
        User passed = cap.getValue();

        assert passed.getId().equals("clerk-user-123");
        assert passed.getEmail().equals("alice@example.com");
        assert passed.getPhoneNumber().equals("555-1234");
        assert passed.getFullName().equals("Alice Smith");
        assert passed.getRole() == Role.USER;
        assert passed.getStatus() == UserStatus.ACTIVE;
        assert passed.getLastLogin() == null;
        assert passed.getCreatedAt() != null;
    }

}