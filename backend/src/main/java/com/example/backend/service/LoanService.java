package com.example.backend.service;

import com.example.backend.exception.custom.ApplicationNotFoundException;
import com.example.backend.exception.custom.LoanNotFoundException;
import com.example.backend.model.Loan;
import com.example.backend.model.LoanApplication;
import com.example.backend.model.enums.ApplicationStatus;
import com.example.backend.model.enums.LoanStatus;
import com.example.backend.repository.LoanApplicationRepository;
import com.example.backend.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final LoanApplicationRepository applicationRepository;

    public LoanService(LoanRepository loanRepository, LoanApplicationRepository applicationRepository) {
        this.loanRepository = loanRepository;
        this.applicationRepository = applicationRepository;
    }

    @Transactional
    public Loan createLoanFromApplication(UUID applicationId) {
        LoanApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(ApplicationNotFoundException::new);

        if (application.getStatus() != ApplicationStatus.APPROVED) {
            throw new IllegalStateException("Application must be approved to create a loan.");
        }

        Loan loan = new Loan();
        loan.setAccount(application.getUser().getAccounts().getFirst());
        loan.setInterestRate(application.getInterestRate());
        loan.setOriginalAmount(application.getRequestedAmount());
        loan.setRemainingAmount(application.getRequestedAmount());
        loan.setStartDate(LocalDate.now());
        loan.setDueDate(LocalDate.now().plusMonths(application.getRepaymentMonths()));
        loan.setStatus(LoanStatus.ACTIVE);

        return loanRepository.save(loan);
    }

    public Loan getLoanById(UUID id) {
        return loanRepository.findById(id).orElseThrow(LoanNotFoundException::new);
    }

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan updateLoanStatus(UUID id, LoanStatus status) {
        Loan loan = getLoanById(id);
        loan.setStatus(status);
        return loanRepository.save(loan);
    }

    public LoanApplication createLoanApplication(LoanApplication application) {
        return applicationRepository.save(application);
    }

    public LoanApplication getLoanApplicationById(UUID id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException("Application not found"));
    }
}