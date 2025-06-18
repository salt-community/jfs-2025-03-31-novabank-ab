package com.example.backend.repository;

import com.example.backend.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByFromAccount_IdOrToAccount_Id(UUID fromAccount, UUID toAccount);

    @Query("""
    SELECT t FROM Transaction t
    WHERE t.fromAccount.id IN :accountIds OR t.toAccount.id IN :accountIds
""")
    Page<Transaction> findByAccountIds(@Param("accountIds") List<UUID> accountIds, Pageable pageable);
}
