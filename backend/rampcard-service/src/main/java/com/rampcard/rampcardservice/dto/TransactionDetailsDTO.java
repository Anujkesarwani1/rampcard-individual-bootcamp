package com.rampcard.rampcardservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class TransactionDetailsDTO {
    private String amount;
    private BrandDTO brand;
    private String date;
    private int id;
    private String memo;
    private List<QuickBookCategoryDTO> quickBooksCategory;
    private String receipt;
    private String sync;
    private UserDTO user;
}
