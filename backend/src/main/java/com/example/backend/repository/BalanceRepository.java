package com.example.backend.repository;

import com.example.backend.model.PlaceHolderBalance;
import org.springframework.data.repository.CrudRepository;

public interface BalanceRepository extends CrudRepository<PlaceHolderBalance, Long> {}
