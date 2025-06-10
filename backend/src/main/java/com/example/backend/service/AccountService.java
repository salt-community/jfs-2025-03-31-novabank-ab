package com.example.backend.service;

import com.example.backend.exception.custom.AccountNotFoundException;
import com.example.backend.model.Account;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BalanceRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final BalanceRepository balanceRepository;

    public AccountService(AccountRepository accountRepository, BalanceRepository balanceRepository) {
        this.accountRepository = accountRepository;
        this.balanceRepository = balanceRepository;
    }

    public Account getAccount(long id) {
        return accountRepository.findById(id)
                .orElseThrow(AccountNotFoundException::new);
    }

}
