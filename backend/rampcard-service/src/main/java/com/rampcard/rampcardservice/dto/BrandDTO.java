package com.rampcard.rampcardservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandDTO {
    private Integer id;
    private String label;
    private String subLabel;
}
