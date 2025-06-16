package com.example.backend.model;

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

}
