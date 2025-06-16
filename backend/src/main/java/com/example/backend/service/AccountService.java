package com.example.backend.service;

import com.example.backend.dto.accountDto.request.BalanceUpdateRequestDto;
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
        return accountRepository.findAll();
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

    public void updateBalance(UUID accountId, String userId, double amount, BalanceUpdateRequestDto.UpdateType type) {
        Account account = getAccount(accountId, userId);
        if (account.getStatus() == AccountStatus.CLOSED || account.getStatus() == AccountStatus.SUSPENDED) {
            throw new AccountClosedException("Cannot update balance of inactive account");
        }

        double newBalance = switch (type) {
            case DEPOSIT -> account.getBalance() + amount;
            case WITHDRAW -> account.getBalance() - amount;
        };

        if (newBalance < 0) {
            throw new InsufficientFundsException();
        }

        account.setBalance(newBalance);
        accountRepository.save(account);
    }

    public Account changeAccountStatus(UUID accountId, String userId, AccountStatus newStatus) {
        Account account = getAccount(accountId, userId);
        account.setStatus(newStatus);
        return accountRepository.save(account);
    }

    public void deleteAccount(UUID accountId, String userId) {
        Account account = getAccount(accountId, userId);
        accountRepository.delete(account);
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
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }
}
