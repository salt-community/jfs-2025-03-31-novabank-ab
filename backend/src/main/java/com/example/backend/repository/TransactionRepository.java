package com.example.backend.repository;

import com.example.backend.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByFromAccount_IdOrToAccount_Id(UUID fromAccount, UUID toAccount);

    List<Transaction> findAllByFromAccount_IdInOrToAccount_IdIn(List<UUID> fromAccountIds, List<UUID> toAccountIds);

    Page<Transaction> findByFromAccount_IdInOrToAccount_IdIn(List<UUID> fromAccountIds, List<UUID> toAccountIds, Pageable pageable);

    Page<Transaction> findByFromAccount_IdOrToAccount_Id(UUID fromAccount, UUID toAccount, Pageable pageable);

    List<Transaction> findByIdIn(List<UUID> ids);

    Page<Transaction> findByFromAccount_IdInOrToAccount_IdInAndAmountBetween(
            List<UUID> fromIds,
            List<UUID> toIds,
            BigDecimal minAmount,
            BigDecimal maxAmount,
            Pageable pageable
    );

    @Query("""
    SELECT t FROM Transaction t
    WHERE (t.fromAccount.id = :accountId OR t.toAccount.id = :accountId)
    AND t.amount BETWEEN :minAmount AND :maxAmount
""")
    Page<Transaction> findByAccountAndAmountBetween(
            @Param("accountId") UUID accountId,
            @Param("minAmount") BigDecimal minAmount,
            @Param("maxAmount") BigDecimal maxAmount,
            Pageable pageable
    );
    
    @Query("""
    SELECT t FROM Transaction t
    WHERE (t.fromAccount.id IN :accountIds OR t.toAccount.id IN :accountIds)
    AND t.amount BETWEEN :minAmount AND :maxAmount
""")
    Page<Transaction> findByAccountsAndAmountBetween(
            @Param("accountIds") List<UUID> accountIds,
            @Param("minAmount") BigDecimal minAmount,
            @Param("maxAmount") BigDecimal maxAmount,
            Pageable pageable
    );
}
