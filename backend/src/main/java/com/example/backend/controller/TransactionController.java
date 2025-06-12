package com.example.backend.controller;

import com.example.backend.dto.ScheduledRequestDto;
import com.example.backend.dto.TransactionRequestDto;
import com.example.backend.model.Account;
import com.example.backend.service.AccountService;
import com.example.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping({"/api/transaction", "/api/transaction/"})
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService;

    @Autowired
    public TransactionController(TransactionService service, AccountService accountService){
        this.transactionService = service;
        this.accountService = accountService;
    }


    @GetMapping("/account/{transactionId}")
    public ResponseEntity<?> getTransaction(@PathVariable UUID transactionId){
        return ResponseEntity.ok().body(transactionService.getTransaction(transactionId));
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<?> getAllTransactions(@PathVariable UUID accountId){
        return ResponseEntity.ok().body(transactionService.getAllTransactions(accountId));
    }

    @PostMapping
    public ResponseEntity<?> addTransaction( @RequestBody TransactionRequestDto dto){
        transactionService.addTransaction(dto.convertToTransaction());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/scheduled")
    public ResponseEntity<?> addScheduledTransaction(@RequestBody ScheduledRequestDto dto){
        transactionService.addScheduledTransaction(dto.toScheduledTransaction());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<?> deleteScheduledTransaction(@PathVariable UUID transactionId){
        transactionService.deleteScheduledTransaction(transactionId);
        return ResponseEntity.noContent().build();
    }


}
