package com.example.backend.service;

import com.example.backend.dto.currencyDto.request.CurrencyConversionRequestDto;
import com.example.backend.dto.currencyDto.response.CurrencyConversionResultDto;

import com.example.backend.dto.transactionDto.request.TransactionRequestDto;
import com.example.backend.dto.transactionDto.response.UnifiedTransactionResponseDto;
import com.example.backend.exception.custom.*;
import com.example.backend.model.Account;
import com.example.backend.model.Currency;
import com.example.backend.model.ScheduledTransaction;
import com.example.backend.model.Transaction;
import com.example.backend.model.enums.AccountStatus;
import com.example.backend.model.enums.PaymentType;
import com.example.backend.model.enums.TransactionStatus;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.ScheduledTransactionRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ScheduledTransactionRepository scheduledTransactionRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final GeminiService geminiService;
    private final CurrencyService currencyService;

    public TransactionService(TransactionRepository transactionRepository,
                              ScheduledTransactionRepository scheduledTransactionRepository,
                              AccountRepository accountRepository,
                              AccountService accountService,
                              GeminiService geminiService,
                              CurrencyService currencyService) {
        this.transactionRepository = transactionRepository;
        this.scheduledTransactionRepository = scheduledTransactionRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
        this.geminiService = geminiService;
        this.currencyService = currencyService;
    }

    @Transactional
    public void addTransaction(TransactionRequestDto dto, String userId) {
        TransactionData data = prepareTransactionData(dto, userId);
        boolean isScheduled = dto.transactionDate().isAfter(LocalDate.now(ZoneOffset.UTC));
        String category = geminiService.classifyTransaction(
                dto.description(),
                dto.amount(),
                dto.userNote()
        );

        System.out.println(isScheduled);
        System.out.println(dto.transactionDate().isAfter(LocalDate.now(ZoneOffset.UTC)));

        processTransaction(dto, data, isScheduled, category);
    }

    public UnifiedTransactionResponseDto getTransaction(UUID transactionId, String userId) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            Transaction transaction = authorizeTransactionAccess(transactionOptional.get(), userId);
            return UnifiedTransactionResponseDto.fromTransaction(transaction);
        }

        Optional<ScheduledTransaction> scheduledTransactionOptional = scheduledTransactionRepository.findById(transactionId);
        if (scheduledTransactionOptional.isPresent()) {
            ScheduledTransaction scheduledTransaction = scheduledTransactionOptional.get();
            if (!Objects.equals(scheduledTransaction.getFromAccount().getUser().getId(), userId)) {
                throw new UserUnauthorizedException("User not authorized to access this transaction");
            }
            return UnifiedTransactionResponseDto.fromScheduledTransaction(scheduledTransaction);
        }

        throw new TransactionNotFoundException();
    }

    public List<UnifiedTransactionResponseDto> getAllTransactionsByAccount(UUID accountId, String userId) {
        Account account = accountService.getAccount(accountId, userId);
        List<Transaction> transactions = transactionRepository.findByFromAccount_IdOrToAccount_Id(account.getId(), account.getId());
        List<ScheduledTransaction> scheduledTransactions = scheduledTransactionRepository.findByFromAccount_Id(account.getId());

        List<UnifiedTransactionResponseDto> unifiedTransactions = new ArrayList<>();
        transactions.forEach(t -> unifiedTransactions.add(UnifiedTransactionResponseDto.fromTransaction(t)));
        scheduledTransactions.forEach(st -> unifiedTransactions.add(UnifiedTransactionResponseDto.fromScheduledTransaction(st)));

        unifiedTransactions.sort(
                Comparator
                        .comparing((UnifiedTransactionResponseDto dto) -> dto.status() == null)
                        .thenComparing(UnifiedTransactionResponseDto::date, Comparator.reverseOrder())
        );
        return unifiedTransactions;
    }

    public List<Transaction> getAllTransactionsByIds(List<String> transactionIds) {
        List<UUID> uuidList = transactionIds.stream()
                .map(UUID::fromString)
                .toList();
        return transactionRepository.findByIdIn(uuidList);
    }

    public void deleteScheduledTransaction(UUID transactionId, String userId) {
        ScheduledTransaction transaction = scheduledTransactionRepository.findById(transactionId).orElseThrow(TransactionNotFoundException::new);
        if (!Objects.equals(transaction.getFromAccount().getUser().getId(), userId)) {
            throw new UserUnauthorizedException("User not authorized to delete this scheduled transaction");
        }
        transaction.setStatus(TransactionStatus.CANCELLED);
        scheduledTransactionRepository.save(transaction);
    }

    @Scheduled(cron = "0 0 9 * * *", zone = "Europe/Stockholm")
    @Transactional
    public void processScheduledTransactions() {
        LocalDateTime now = LocalDateTime.now();
        List<ScheduledTransaction> scheduledTransactions = scheduledTransactionRepository.findByScheduledDateBeforeAndStatus(now, TransactionStatus.PENDING);

        for (ScheduledTransaction scheduledTransaction : scheduledTransactions) {
            Account from = accountRepository.findByAccountNumber(scheduledTransaction.getFromAccount().getAccountNumber())
                    .orElseThrow(AccountNotFoundException::new);

            Account to = null;
            if (scheduledTransaction.getType() == PaymentType.INTERNAL_TRANSFER && scheduledTransaction.getToAccount() != null) {
                to = accountRepository.findByAccountNumber(scheduledTransaction.getToAccount().getAccountNumber())
                        .orElseThrow(AccountNotFoundException::new);
            }

            if (!accountIsActive(from) || (to != null && !accountIsActive(to))) {
                scheduledTransaction.setStatus(TransactionStatus.FAILED);
                continue;
            }

            double originalAmount = scheduledTransaction.getAmount();
            Currency fromCurr = from.getCurrency();
            Currency toCurr = (to != null ? to.getCurrency() : fromCurr);
            double convertedAmount = originalAmount; //init och om det är samma valuta behövs ju ingen konvertering
            double rateUsed = 1.0; //samma logik som raden innan
            LocalDate rateDate = LocalDate.now();


            // konverterar
            if (!fromCurr.equals(toCurr)) {
                CurrencyConversionRequestDto req = new CurrencyConversionRequestDto(
                        fromCurr.getAbbrevation().name(),
                        toCurr.getAbbrevation().name(),
                        originalAmount);
                CurrencyConversionResultDto conv = currencyService.convertCurrency(req);
                convertedAmount = conv.convertedAmount();
                rateUsed = conv.rateUsed();
                rateDate = LocalDate.parse(conv.rateDate());
            }


            if (from.getBalance() < scheduledTransaction.getAmount()) {
                scheduledTransaction.setStatus(TransactionStatus.FAILED);
                continue;
            }


            //ersätter gamla updateBalances
            from.setBalance(from.getBalance() - originalAmount);
            if (to != null) {
                to.setBalance(to.getBalance() + convertedAmount);
                accountRepository.save(to);
            }
            accountRepository.save(from);

            // för att ha kvar pending/executed/failed i builder nedan men skulle kunna köra bara "executed"
            TransactionStatus transStatus = scheduledTransaction.getStatus() == TransactionStatus.PENDING
                    ? TransactionStatus.EXECUTED
                    : TransactionStatus.FAILED;

            Transaction trans = Transaction.builder()
                    .fromAccount(from)
                    .toAccount(to)
                    .recipientNumber((scheduledTransaction.getRecipientNumber()))
                    .type(scheduledTransaction.getType())
                    .createdAt(now)
                    .amount(originalAmount)
                    .convertedAmount(convertedAmount)
                    .currencyFrom(fromCurr)
                    .currencyTo(toCurr)
                    .rateUsed(rateUsed)
                    .rateDate(rateDate)
                    .description(scheduledTransaction.getDescription())
                    .userNote(scheduledTransaction.getUserNote())
                    .ocrNumber(scheduledTransaction.getOcrNumber())
                    .category(scheduledTransaction.getCategory())
                    .status(transStatus)
                    .build();

            transactionRepository.save(trans);
            scheduledTransaction.setStatus(TransactionStatus.EXECUTED);
        }

        scheduledTransactionRepository.saveAll(scheduledTransactions);
    }

    public Page<UnifiedTransactionResponseDto> getTransactionsByUser(String userId, Pageable pageable, UUID accountId) {
        if (accountId != null) {
           Page<Transaction>  transactions = transactionRepository.findByFromAccount_IdOrToAccount_Id(accountId, accountId, pageable);
          return transactions.map(UnifiedTransactionResponseDto::fromTransaction);
        }
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        List<UUID> accountIds = accounts.stream().map(Account::getId).toList();
        Page<Transaction> transactions = transactionRepository
                .findByFromAccount_IdInOrToAccount_IdIn(accountIds, accountIds, pageable);
        return transactions.map(UnifiedTransactionResponseDto::fromTransaction);
    }

    public List<Transaction> getAllTransactionsByUserNoPagination(String userId) {
        List<Account> accounts = accountService.getAllUserAccounts(userId);
        List<UUID> accountIds = accounts.stream().map(Account::getId).toList();
        return transactionRepository
                .findAllByFromAccount_IdInOrToAccount_IdIn(accountIds, accountIds);
    }

    public Page<UnifiedTransactionResponseDto> getAllTransactionHistory(Pageable pageable) {
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        return transactions.map(UnifiedTransactionResponseDto::fromTransaction);
    }

    private record TransactionData(Account from, Account to, String recipientNumber) {
    }

    private boolean accountIsActive(Account account) {
        return account.getStatus() == AccountStatus.ACTIVE;
    }

    private void updateBalances(Account from, Account to, double amount) {
        from.setBalance(from.getBalance() - amount);
        if (to != null) {
            to.setBalance(to.getBalance() + amount);
            accountRepository.save(to);
        }
        accountRepository.save(from);
    }


    private Transaction authorizeTransactionAccess(Transaction tx, String userId) {
        if (!isTransactionAccessibleByUser(tx, userId)) {
            throw new UserUnauthorizedException("User not authorized to access this transaction");
        }
        return tx;
    }

    private boolean isTransactionAccessibleByUser(Transaction tx, String userId) {
        return Objects.equals(tx.getFromAccount().getUser().getId(), userId)
                || (tx.getToAccount() != null && Objects.equals(tx.getToAccount().getUser().getId(), userId));
    }

    private void processTransaction(TransactionRequestDto dto,
                                    TransactionData data,
                                    boolean isScheduled,
                                    String category) {
        if (isScheduled) {

            Currency fromCurr = data.from().getCurrency();
            Currency toCurr = (data.to() != null ? data.to().getCurrency() : fromCurr);
            double amt = dto.amount();
            double convAmt = amt;
            double rate = 1.0;
            LocalDate rDate = LocalDate.now();

            if (!fromCurr.equals(toCurr)) {
                CurrencyConversionRequestDto req = new CurrencyConversionRequestDto(
                        fromCurr.getAbbrevation().name(),
                        toCurr.getAbbrevation().name(),
                        amt);
                CurrencyConversionResultDto conv = currencyService.convertCurrency(req);
                convAmt = conv.convertedAmount();
                rate    = conv.rateUsed();
                rDate   = LocalDate.parse(conv.rateDate());
            }


            ScheduledTransaction scheduled = ScheduledTransaction.builder()
                    .fromAccount(data.from())
                    .toAccount(dto.type() == PaymentType.INTERNAL_TRANSFER ? data.to() : null)
                    .recipientNumber(dto.type() == PaymentType.INTERNAL_TRANSFER ? null : data.recipientNumber())
                    .type(dto.type())
                    .amount(amt)
                    .scheduledDate(dto.transactionDate().atStartOfDay())
                    .status(TransactionStatus.PENDING)
                    .createdAt(LocalDateTime.now())
                    .ocrNumber(dto.ocrNumber())
                    .userNote(dto.userNote())
                    .description(dto.description())
                    .category(category)
                    .currencyFrom(fromCurr)
                    .currencyTo(toCurr)
                    .convertedAmount(convAmt)
                    .rateUsed(rate)
                    .rateDate(rDate)
                    .build();

            scheduledTransactionRepository.save(scheduled);
        } else {
            if (data.from().getBalance() < dto.amount()) {
                throw new InsufficientFundsException("Not enough balance");
            }

            Currency fromCurr = data.from().getCurrency();
            Currency toCurr   = (data.to() != null ? data.to().getCurrency() : fromCurr);
            double amt      = dto.amount();
            double convAmt  = amt;
            double rate     = 1.0;
            LocalDate rDate = LocalDate.now();

            if (!fromCurr.equals(toCurr)) {
                CurrencyConversionRequestDto req = new CurrencyConversionRequestDto(
                        fromCurr.getAbbrevation().name(),
                        toCurr.getAbbrevation().name(),
                        amt);
                CurrencyConversionResultDto conv = currencyService.convertCurrency(req);
                convAmt = conv.convertedAmount();
                rate    = conv.rateUsed();
                rDate   = LocalDate.parse(conv.rateDate());
            }

            data.from().setBalance(data.from().getBalance() - amt);
            if (data.to() != null) {
                data.to().setBalance(data.to().getBalance() + convAmt);
                accountRepository.save(data.to());
            }
            accountRepository.save(data.from());

            Transaction transaction = Transaction.builder()
                    .fromAccount(data.from())
                    .toAccount(data.to())
                    .recipientNumber(data.recipientNumber())
                    .type(dto.type())
                    .createdAt(LocalDateTime.now())
                    .amount(amt)
                    .convertedAmount(convAmt)
                    .currencyFrom(fromCurr)
                    .currencyTo(toCurr)
                    .rateUsed(rate)
                    .rateDate(rDate)
                    .description(dto.description())
                    .userNote(dto.userNote())
                    .ocrNumber(dto.ocrNumber())
                    .category(category)
                    .status(TransactionStatus.EXECUTED)
                    .build();


            transactionRepository.save(transaction);
        }
    }

    private TransactionData prepareTransactionData(TransactionRequestDto dto, String userId) {
        Account from = accountRepository.findByAccountNumber(dto.fromAccountNo())
                .orElseThrow(AccountNotFoundException::new);

        if (!Objects.equals(from.getUser().getId(), userId)) {
            throw new UserUnauthorizedException("User not connected to account");
        }

        if (!accountIsActive(from)) {
            throw new AccountNotAllowedException("From account is not active.");
        }

        Account to = null;
        String recipientNumber = null;

        if (dto.type() == PaymentType.INTERNAL_TRANSFER) {
            if (dto.toAccountNo() == null) {
                throw new AccountNotFoundException("To account not found");
            }
            to = accountRepository.findByAccountNumber(dto.toAccountNo())
                    .orElseThrow(AccountNotFoundException::new);

            if (!accountIsActive(to)) {
                throw new AccountNotAllowedException("To account is not active.");
            }

        } else if (dto.type() == PaymentType.BANKGIRO || dto.type() == PaymentType.PLUSGIRO) {
            if (dto.toAccountNo() == null || dto.toAccountNo().isBlank()) {
                throw new AccountNotFoundException("To account not found");
            }
            recipientNumber = dto.toAccountNo();
        }

        return new TransactionData(from, to, recipientNumber);
    }
}
