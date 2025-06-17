package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Getter @Setter
public class AccountNickname {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private UUID id;
    private String nickname;

    @OneToOne(optional = true)
    private Account account;

    public AccountNickname() {}

    public AccountNickname(Account account, String nickname) {
        this.nickname = nickname;
        this.account = account;
    }
}
