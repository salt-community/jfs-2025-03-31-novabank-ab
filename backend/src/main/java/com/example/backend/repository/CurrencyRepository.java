package com.example.backend.repository;

import com.example.backend.model.Currency;
import com.example.backend.model.enums.CurrencyAbbrevation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, UUID> {
    Optional<Currency> findByAbbrevation(CurrencyAbbrevation abbrevation);
}
