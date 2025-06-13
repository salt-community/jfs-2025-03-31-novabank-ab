package com.example.backend.service;

import com.example.backend.exception.custom.*;
import com.example.backend.model.Account;
import com.example.backend.model.User;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final Random random = new Random();

    public AccountService(AccountRepository accountRepository,
                          UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public Account getAccount(UUID accountId, String userId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(AccountNotFoundException::new);

        if (!Objects.equals(account.getUser().getId(), userId)) {
            throw new UserUnauthorizedException("User not connected to account");
        }

        return account;
    }

    public List<Account> getAllUserAccounts(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        return accountRepository.findAccountsByUser(user);
    }

    public List<Account> getAllAccounts() {
        return (List<Account>) accountRepository.findAll();
    }

    public double getBalance(UUID accountId, String userId) {
        Account account = getAccount(accountId, userId);
        return account.getBalance();
    }

    public Account createAccount(Account account) {
        userRepository.findById(account.getUser().getId())
                .orElseThrow(UserNotFoundException::new);
        account.setCreatedAt(LocalDate.now());
        account.setStatus(AccountStatus.ACTIVE);
        account.setBalance(0);
        account.setAccountNumber(generateUniqueAccountNumber());
        return accountRepository.save(account);
    }


    private String generateUniqueAccountNumber() {
        //Todo: make this secure
        String prefix = "1337-";
        String accountNumber;

        do {
            accountNumber = prefix + generateRandomDigits(9);
        } while (accountRepository.existsByAccountNumber(accountNumber));

        return accountNumber;
    }

    private String generateRandomDigits(int length) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }

    public void addDeposit(UUID accountId, double amount, String userId) {
        //System.out.println("WAS HERE!");
        Account account = getAccount(accountId, userId);
        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);
    }

    public void makeWithdrawal(UUID accountId, double amount, String userId) {
        Account account = getAccount(accountId, userId);
        if (account.getBalance() < amount) {
            throw new InsufficientFundsException();
        }
        account.setBalance(account.getBalance() - amount);
        accountRepository.save(account);

    }

    public void makeAccountSuspend(UUID accountId, String userId) {
        Account account = getAccount(accountId, userId);
        account.setStatus(AccountStatus.SUSPENDED);
        accountRepository.save(account);
    }

    public void deleteAccount(UUID accountId, String userId) {
        Account account = getAccount(accountId, userId);
        accountRepository.delete(account);
    }
}
