package com.example.backend.model;

import com.example.backend.model.enums.PaymentType;
import com.example.backend.model.enums.TransactionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "scheduled_transactions")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduledTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account_id", nullable = false)
    private Account fromAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_account_id")
    private Account toAccount;

    @Column(nullable = false)
    private String recipientNumber;

    @NonNull()
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType type;

    @NonNull
    @Column(nullable = false)
    private Double amount;

    @NonNull
    @Column(nullable = false)
    private LocalDateTime scheduledDate;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;

    @NonNull
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @NonNull
    @Column(nullable = false)
    private String ocrNumber;

    @NonNull
    @Column(nullable = false)
    private String userNote;

    @NonNull
    @Column(nullable = false)
    private String description;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
