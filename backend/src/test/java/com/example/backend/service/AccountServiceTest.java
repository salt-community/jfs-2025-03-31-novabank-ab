package com.example.backend.service;

import com.example.backend.dto.accountDto.request.BalanceUpdateRequestDto;
import com.example.backend.exception.custom.*;
import com.example.backend.model.Account;
import com.example.backend.model.User;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    private AccountRepository accountRepository;
    private UserRepository userRepository;
    private AccountService accountService;

    private final String USER_ID = "user-123";
    private final UUID ACCOUNT_ID = UUID.randomUUID();

    private User sampleUser() {
        User user = new User();
        user.setId(USER_ID);
        return user;
    }

    private Account sampleAccount() {
        Account account = new Account();
        account.setId(ACCOUNT_ID);
        account.setUser(sampleUser());
        account.setBalance(100.0);
        account.setStatus(AccountStatus.ACTIVE);
        return account;
    }

    @BeforeEach
    void setUp() {
        accountRepository = mock(AccountRepository.class);
        userRepository = mock(UserRepository.class);
        accountService = new AccountService(accountRepository, userRepository);
    }
}
