package com.example.backend.model;

import com.example.backend.model.enums.PaymentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter @Setter
public class ClientTransaction {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account_id")
    private Account fromAccount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_client_id")
    private Client toClient;
    @Column(nullable = false)

    @Enumerated(EnumType.STRING)
    private PaymentType type;

    private LocalDateTime createdAt;
    @Column(nullable = false)
    private double amount;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String userNote;
    @Column(nullable = false)
    private String ocrNumber;

    public ClientTransaction() {}

    public ClientTransaction(
        UUID id,
        Account fromAccount,
        Client toClient,
        PaymentType type,
        LocalDateTime createdAt,
        double amount,
        String description,
        String userNote,
        String ocrNumber
    ) {
        this.id = id;
        this.fromAccount = fromAccount;
        this.toClient = toClient;
        this.type = type;
        this.createdAt = createdAt;
        this.amount = amount;
        this.description = description;
        this.userNote = userNote;
        this.ocrNumber = ocrNumber;
    }
}
