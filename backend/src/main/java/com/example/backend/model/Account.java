package com.example.backend.model;

import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.BankAccountType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "currency_id")
    private Currency currency;
    private LocalDate createdAt;
    private double balance;

    @Enumerated(EnumType.STRING)
    private BankAccountType type;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    private String accountNumber;

    @OneToMany(mappedBy = "fromAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactionsFrom = new ArrayList<>();

    @OneToMany(mappedBy = "toAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactionsTo = new ArrayList<>();


}
