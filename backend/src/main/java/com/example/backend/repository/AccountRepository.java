package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface AccountRepository extends CrudRepository<Account, UUID> {
    List<Account> findAccountsByUser(User user);
}
