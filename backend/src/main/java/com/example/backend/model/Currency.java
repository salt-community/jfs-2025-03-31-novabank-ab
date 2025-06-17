package com.example.backend.model;

import com.example.backend.model.enums.CurrencyAbbrevation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@Table(name = "currencies")
public class Currency {

    public Currency() {}

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private UUID id;
    private String name;

    @Enumerated(EnumType.STRING)
    private CurrencyAbbrevation abbrevation;

    @OneToMany
    @JoinColumn(name = "account_id")
    private List<Account> accounts;
}