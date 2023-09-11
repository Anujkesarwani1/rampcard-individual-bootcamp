package com.rampcard.rampcardservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class QuickBookCategoryNotFoundException extends RuntimeException {
    public QuickBookCategoryNotFoundException(Integer id) {
        super("Quickbook Category not found with ID: " + id);
    }
}
