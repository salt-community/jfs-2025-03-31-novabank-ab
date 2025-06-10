package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AccountRepository extends CrudRepository<Account, Long> {
    List<Account> findAccountsByUser(User user);
}
