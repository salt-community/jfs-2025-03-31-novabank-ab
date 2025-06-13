package com.example.backend.dto;

public class ExchangeRateResponseDto {

    private String date;
    private double value;

    public ExchangeRateResponseDto() {
    }

    public ExchangeRateResponseDto(String date, double value) {
        this.date = date;
        this.value = value;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
