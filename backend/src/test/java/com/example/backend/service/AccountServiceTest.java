//package com.example.backend.service;
//
//import com.example.backend.exception.custom.AccountNotFoundException;
//import com.example.backend.exception.custom.UserNotFoundException;
//import com.example.backend.repository.AccountRepository;
//import com.example.backend.repository.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Disabled;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.lang.reflect.Method;
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.*;
//
//@Disabled
//class AccountServiceTest {
//
//    @Mock
//    private AccountRepository accountRepository;
//
//    @Mock
//    private UserRepository userRepository;
//
//    private AccountService service;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//        service = new AccountService(accountRepository, userRepository);
//    }
//
//    @Test
//    void generateUniqueAccountNumber_firstTryUnique() throws Exception {
//        when(accountRepository.existsByAccountNumber(anyString())).thenReturn(false);
//
//        Method genUnique = AccountService.class
//                .getDeclaredMethod("generateUniqueAccountNumber");
//        genUnique.setAccessible(true);
//
//        String acct = (String) genUnique.invoke(service);
//        assertTrue(acct.startsWith("1337-"));
//        assertEquals(5 + 9, acct.length());
//        verify(accountRepository, times(1)).existsByAccountNumber(acct);
//    }
//
//
//    @Test
//    void getAllUserAccounts_userNotFound_throwsUserNotFoundException() {
//        when(userRepository.findById("unknown-user")).thenReturn(Optional.empty());
//
//        assertThrows(UserNotFoundException.class,
//                () -> service.getAllUserAccounts("unknown-user"));
//
//        verify(userRepository).findById("unknown-user");
//        verifyNoInteractions(accountRepository);
//    }
//
//    @Test
//    void getAccount_accountNotFound_throwsAccountNotFoundException() {
//        UUID accountId = UUID.randomUUID();
//        when(accountRepository.findById(accountId))
//                .thenReturn(Optional.empty());
//
//        assertThrows(AccountNotFoundException.class,
//                () -> service.getAccount(accountId));
//
//        verify(accountRepository).findById(accountId);
//        verifyNoMoreInteractions(accountRepository);
//    }
//}