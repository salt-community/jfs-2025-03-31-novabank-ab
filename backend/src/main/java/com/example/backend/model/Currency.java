package com.example.backend.model;

import com.example.backend.model.enums.CurrencyAbbrevation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@Table(name = "currencies")
public class Currency {

    public Currency() {}

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    private UUID id;
    private String name;

    @Enumerated(EnumType.STRING)
    private CurrencyAbbrevation abbrevation;

}