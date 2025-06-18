package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "account_nicknames")
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class AccountNickname {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NonNull
    @Column(nullable = false)
    private String nickname;

    @NonNull
    @OneToOne(optional = true)
    private Account account;

}
