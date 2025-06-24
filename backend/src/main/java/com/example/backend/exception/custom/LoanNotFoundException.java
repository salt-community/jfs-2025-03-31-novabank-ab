package com.example.backend.exception.custom;

public class LoanNotFoundException extends RuntimeException {
    public LoanNotFoundException(String message) {
        super(message);
    }

  public LoanNotFoundException() {
    super("Loan not found");
  }
}
