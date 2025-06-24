package com.example.backend.service;

import com.example.backend.dto.loanDto.request.RiksbankRateRequestDto;
import com.example.backend.dto.loanDto.response.RiksbankRateResponseDto;
import com.example.backend.exception.custom.ApplicationNotFoundException;
import com.example.backend.exception.custom.LoanNotFoundException;
import com.example.backend.model.Loan;
import com.example.backend.model.LoanApplication;
import com.example.backend.model.UserApplication;
import com.example.backend.model.enums.ApplicationStatus;
import com.example.backend.model.enums.LoanStatus;
import com.example.backend.repository.LoanApplicationRepository;
import com.example.backend.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final LoanApplicationRepository applicationRepository;

    private final RestTemplate restTemplate;

    private final String API_URL;
    private final String API_KEY;
    private final LoanApplicationRepository loanApplicationRepository;


    public LoanService(LoanRepository loanRepository,
                       LoanApplicationRepository applicationRepository,
                       @Value("${RIKSBANK_API_URL}") String apiUrl,
                       @Value("${RIKSBANK_API_KEY}") String apiKey, LoanApplicationRepository loanApplicationRepository) {
        this.loanRepository = loanRepository;
        this.applicationRepository = applicationRepository;
        this.restTemplate = new RestTemplate();
        this.API_URL = apiUrl;
        this.API_KEY = apiKey;
        this.loanApplicationRepository = loanApplicationRepository;
    }

    private RiksbankRateResponseDto fetchPolicyRate(RiksbankRateRequestDto requestDto) {
        String url = API_URL + "/swea/v1/Observations/Latest/" + requestDto.seriesCode();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("Ocp-Apim-Subscription-Key", API_KEY);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<RiksbankRateResponseDto> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                RiksbankRateResponseDto.class
        );

        RiksbankRateResponseDto responseDto = response.getBody();

        if (responseDto == null || responseDto.value() == 0) {
            throw new ApplicationNotFoundException("Could not find Riksbanken policy Rate.");
        }

        return responseDto;
    }

    public Loan createLoanFromApplication(UUID applicationId) {
        LoanApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(ApplicationNotFoundException::new);

        if (application.getStatus() != ApplicationStatus.APPROVED) {
            throw new IllegalStateException("Application must be approved to create a loan.");
        }

        RiksbankRateRequestDto requestDto = new RiksbankRateRequestDto("SECBREPOEFF");
        RiksbankRateResponseDto responseDto = fetchPolicyRate(requestDto);

        Loan loan = new Loan();
        loan.setAccount(application.getUser().getAccounts().getFirst());
        loan.setInterestRate(responseDto.value());
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

    public Page<Loan> getAllLoans(Pageable pageable) {
        return loanRepository.findAll(pageable);
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

    public void updateLoanApplication(LoanApplication application, ApplicationStatus status) {
        switch (status) {
            case ApplicationStatus.APPROVED -> {
                application.setStatus(ApplicationStatus.APPROVED);
                application.setUpdatedAt(LocalDateTime.now());
                createLoanFromApplication(application.getId());
            }
            case ApplicationStatus.DISAPPROVED -> application.setStatus(ApplicationStatus.DISAPPROVED);
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status: " + status);
        }
        loanApplicationRepository.save(application);
    }

    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationRepository.findAll();
    }

}