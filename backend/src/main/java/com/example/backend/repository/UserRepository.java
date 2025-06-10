package com.example.backend.repository;

import com.example.backend.model.PlaceHolderUser;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<PlaceHolderUser, Long> {}
