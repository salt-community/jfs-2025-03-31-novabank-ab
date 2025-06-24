package com.example.backend.model;

import com.example.backend.model.enums.PaymentType;
import com.example.backend.model.enums.TransactionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // exchange rate stuff start

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_from_id", nullable = false)
    private Currency currencyFrom;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_to_id", nullable = false)
    private Currency currencyTo;

    @NonNull
    @Column(nullable = false)
    private double convertedAmount;

    @NonNull
    @Column(nullable = false)
    private double rateUsed;

    @NonNull
    @Column(nullable = false)
    private LocalDate rateDate;

    // exchange rate stuff end


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account_id", nullable = false)
    private Account fromAccount;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_account_id")
    private Account toAccount;

    @Column(nullable = true)
    private String recipientNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType type;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String userNote;

    @Column(nullable = false)
    private String ocrNumber;

    @Column(nullable = true)
    private String category;
    @Column(nullable = true)
    private TransactionStatus status;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
