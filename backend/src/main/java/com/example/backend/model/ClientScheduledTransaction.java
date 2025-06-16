package com.example.backend.model;

import com.example.backend.model.enums.TransactionStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
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
}
