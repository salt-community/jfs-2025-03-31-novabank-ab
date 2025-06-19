package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

/**
 * EXTERNAL CLIENT
 */
@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String accountNumber;

}
