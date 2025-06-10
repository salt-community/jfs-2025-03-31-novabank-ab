package com.example.backend.service;

import com.example.backend.exception.custom.AccountNotFoundException;
import com.example.backend.exception.custom.UserNotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BalanceRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final BalanceRepository balanceRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository, BalanceRepository balanceRepository, UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.balanceRepository = balanceRepository;
        this.userRepository = userRepository;
    }

    public Account getAccount(long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(AccountNotFoundException::new);
    }

    public List<Account> getAllUserAccounts(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        return accountRepository.findAccountsByUser(user);
    }
}
