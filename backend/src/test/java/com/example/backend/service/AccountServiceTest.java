package com.example.backend.service;

import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.lang.reflect.Method;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private UserRepository userRepository;

    private AccountService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        service = new AccountService(accountRepository, userRepository);
    }

    @Test
    void generateUniqueAccountNumber_firstTryUnique() throws Exception {
        when(accountRepository.existsByAccountNumber(anyString())).thenReturn(false);

        Method genUnique = AccountService.class
                .getDeclaredMethod("generateUniqueAccountNumber");
        genUnique.setAccessible(true);

        String acct = (String) genUnique.invoke(service);
        assertTrue(acct.startsWith("1337-"));
        assertEquals(5 + 9, acct.length());
        verify(accountRepository, times(1)).existsByAccountNumber(acct);
    }
}