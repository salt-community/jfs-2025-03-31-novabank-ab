package com.example.backend.controller;

import com.example.backend.dto.ScheduledRequestDto;
import com.example.backend.dto.TransactionRequestDto;
import com.example.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/transaction", "/api/transaction/"})
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService service){
        this.transactionService = service;
    }


    @GetMapping("/account/{transactionId}")
    public ResponseEntity<?> getTransaction(@PathVariable long transactionId){
        transactionService.getTransaction(transactionId);
        return null;
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<?> getTransactions(@PathVariable long accountId){
        transactionService.getAllTransactions();
        return null;
    }

    @PostMapping
    public ResponseEntity<?> addTransaction( @RequestBody TransactionRequestDto dto){
        transactionService.addTransaction(dto);
        return null;
    }

    @PostMapping("/scheduled")
    public ResponseEntity<?> addScheduledTransaction(@RequestBody ScheduledRequestDto dto){
        transactionService.addScheduledTransaction(dto);
        return null;
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<?> deleteScheduledTransaction(@PathVariable long transactionId){
        transactionService.deleteScheduledTransaction(transactionId);
        return null;
    }


}
