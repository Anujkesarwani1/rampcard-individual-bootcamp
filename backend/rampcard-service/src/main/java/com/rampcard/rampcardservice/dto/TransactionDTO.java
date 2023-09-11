package com.rampcard.rampcardservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class TransactionDTO {
    private Integer id;
    private Integer brandId;
    private String amount;
    private String date;
    private Integer userId;
    private List<Integer> quickBookCategoryIds;
    private String receipt;
    private String memo;
    private  String sync;
}
