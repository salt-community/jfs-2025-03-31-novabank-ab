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

    @Test
    @DisplayName("getAccount returns account when user is authorized")
    void getAccount_authorized_returnsAccount() {
        Account account = sampleAccount();
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.of(account));

        Account result = accountService.getAccount(ACCOUNT_ID, USER_ID);

        assertEquals(account, result);
    }

    @Test
    @DisplayName("getAccount throws when not found")
    void getAccount_notFound_throws() {
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.empty());

        assertThrows(AccountNotFoundException.class, () ->
                accountService.getAccount(ACCOUNT_ID, USER_ID)
        );
    }

    @Test
    @DisplayName("getAccount throws when user not authorized")
    void getAccount_unauthorized_throws() {
        Account account = sampleAccount();
        account.getUser().setId("other-user");
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.of(account));

        assertThrows(UserUnauthorizedException.class, () ->
                accountService.getAccount(ACCOUNT_ID, USER_ID)
        );
    }

    @Test
    @DisplayName("createAccount sets fields and saves")
    void createAccount_valid_setsFieldsAndSaves() {
        User user = sampleUser();
        Account input = new Account();
        input.setUser(user);

        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
        when(accountRepository.existsByAccountNumber(anyString())).thenReturn(false);
        when(accountRepository.save(any(Account.class))).thenAnswer(i -> i.getArgument(0));

        Account result = accountService.createAccount(input);

        assertEquals(0, result.getBalance());
        assertEquals(AccountStatus.ACTIVE, result.getStatus());
        assertNotNull(result.getCreatedAt());
        assertTrue(result.getAccountNumber().startsWith("1337-"));
    }

    @Test
    @DisplayName("updateBalance handles deposit correctly")
    void updateBalance_deposit_success() {
        Account account = sampleAccount();
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.of(account));

        accountService.updateBalance(ACCOUNT_ID, USER_ID, 50.0, BalanceUpdateRequestDto.UpdateType.DEPOSIT);

        assertEquals(150.0, account.getBalance());
    }

    @Test
    @DisplayName("updateBalance throws if insufficient funds")
    void updateBalance_withdraw_insufficient_throws() {
        Account account = sampleAccount();
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.of(account));

        assertThrows(InsufficientFundsException.class, () ->
                accountService.updateBalance(ACCOUNT_ID, USER_ID, 200.0, BalanceUpdateRequestDto.UpdateType.WITHDRAW)
        );
    }

    @Test
    @DisplayName("deleteAccount deletes the account")
    void deleteAccount_valid_deletesAccount() {
        Account account = sampleAccount();
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.of(account));

        accountService.deleteAccount(ACCOUNT_ID, USER_ID);

        verify(accountRepository).delete(account);
    }

    @Test
    @DisplayName("updateBalance throws when account is not ACTIVE")
    void updateBalance_inactiveAccount_throws() {
        Account account = sampleAccount();
        account.setStatus(AccountStatus.CLOSED);

        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.of(account));

        Exception ex = assertThrows(IllegalStateException.class, () ->
                accountService.updateBalance(ACCOUNT_ID, USER_ID, 50.0, BalanceUpdateRequestDto.UpdateType.DEPOSIT)
        );

        assertEquals("Cannot update balance of inactive account", ex.getMessage());
    }

}
