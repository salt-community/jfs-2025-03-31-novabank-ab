package com.example.backend.repository;

import com.example.backend.model.AccountNickname;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AccountNicknameRepository extends JpaRepository<AccountNickname, UUID> {
    public Optional<AccountNickname> findAccountNicknameByAccount_Id(UUID id);
}
