package com.example.backend.model;

import com.example.backend.model.enums.PaymentType;
import com.example.backend.model.enums.TransactionStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter @Setter
public class ClientScheduledTransaction {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account_id", nullable = false)
    private Account fromAccount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_client_id", nullable = false)
    private Client toClient;

    @Enumerated(EnumType.STRING)
    private PaymentType type;

    @Column(nullable = false)
    private double amount;
    @Column(nullable = false)
    private LocalDateTime scheduledDate;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private String ocrNumber;
    @Column(nullable = false)
    private String userNote;
    @Column(nullable = false)
    private String description;

    public ClientScheduledTransaction() {}

    public ClientScheduledTransaction(
        UUID id,
        Account fromAccount,
        Client toClient,
        PaymentType type,
        double amount,
        LocalDateTime scheduledDate,
        TransactionStatus status,
        LocalDateTime createdAt,
        String ocrNumber,
        String userNote,
        String description
    ) {
        this.id = id;
        this.fromAccount = fromAccount;
        this.toClient = toClient;
        this.type = type;
        this.amount = amount;
        this.scheduledDate = scheduledDate;
        this.status = status;
        this.createdAt = createdAt;
        this.ocrNumber = ocrNumber;
        this.userNote = userNote;
        this.description = description;
    }
}
