package com.example.backend.service;

import com.example.backend.exception.custom.AccountNotFoundException;
import com.example.backend.exception.custom.UserNotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.Balance;
import com.example.backend.model.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BalanceRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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

    public List<Account> getAllAccounts() {
        Iterable<Account> iterable = accountRepository.findAll();
        return StreamSupport.stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }

    public Balance getBalance(long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(AccountNotFoundException::new);

        return balanceRepository.findByAccount(account);
    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }
}
