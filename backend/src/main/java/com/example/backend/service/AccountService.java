package com.example.backend.service;

import com.example.backend.dto.CreateAccountRequestDto;
import com.example.backend.exception.custom.AccountNotFoundException;
import com.example.backend.exception.custom.InsufficientFundsException;
import com.example.backend.exception.custom.UserNotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.User;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository,
                          UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public Account getAccount(UUID accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(AccountNotFoundException::new);
    }

    public List<Account> getAllUserAccounts(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        return accountRepository.findAccountsByUser(user);
    }

    public List<Account> getAllAccounts() {
        Iterable<Account> iterable = accountRepository.findAll();
        return StreamSupport.stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }

    public double getBalance(UUID accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(AccountNotFoundException::new);

        return account.getBalance();
    }

    public Account createAccount(Account account) {
        userRepository.findById(String.valueOf(account.getUser().getId())).orElseThrow(UserNotFoundException::new);
        account.setCreatedAt(LocalDate.now());
        account.setStatus(AccountStatus.ACTIVE);
        account.setBalance(0);
        account.setAccountNumber(generateUniqueAccountNumber());
        return accountRepository.save(account);
    }


    private String generateUniqueAccountNumber() {
        String prefix = "1337-";
        String accountNumber;

        do {
            accountNumber = prefix + generateRandomDigits(9);
        } while (accountRepository.existsByAccountNumber(accountNumber));

        return accountNumber;
    }

    private String generateRandomDigits(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }

    public void addDeposit(UUID accountId, double amount) {
            Account account = getAccount(accountId);
            account.setBalance(account.getBalance() + amount);
            accountRepository.save(account);
    }

    public void makeWithdrawal(UUID accountId, double amount) {
        Account account = getAccount(accountId);
        if (account.getBalance() < amount) {
            throw new InsufficientFundsException();
        }
        account.setBalance(account.getBalance() - amount);
        accountRepository.save(account);

    }

    public void makeAccountSuspend(UUID accountId) {
        Account account = getAccount(accountId);
        account.setStatus(AccountStatus.SUSPENDED);
        accountRepository.save(account);
    }

    public void deleteAccount(UUID accountId) {
        Account account = getAccount(accountId);
        accountRepository.delete(account);
    }
}
