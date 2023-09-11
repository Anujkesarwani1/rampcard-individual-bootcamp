package com.rampcard.rampcardservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RampcardStatusNotFoundException extends RuntimeException{
    public RampcardStatusNotFoundException(Integer id) {
        super("Brand not found with ID: " + id);
    }
}
