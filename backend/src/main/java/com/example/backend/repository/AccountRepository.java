package com.example.backend.repository;

import com.example.backend.model.PlaceHolderAccount;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<PlaceHolderAccount, Long> {}
