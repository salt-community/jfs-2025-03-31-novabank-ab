package com.example.backend.exception.custom;

public class InvalidCurrencyException extends RuntimeException {
  public InvalidCurrencyException(String message) {
    super(message);
  }

  public InvalidCurrencyException() {
    super("Invalid currency abbrevation");
  }
}
