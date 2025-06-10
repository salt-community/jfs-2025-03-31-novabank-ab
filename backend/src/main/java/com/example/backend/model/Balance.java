package com.example.backend.model;

import jakarta.persistence.*;

@Entity
public class Balance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double balance;

    @OneToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", unique = true)
    private Account account;
}
