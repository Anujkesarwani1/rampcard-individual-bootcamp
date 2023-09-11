package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.BrandDTO;

import java.util.List;

public interface BrandService {
    public BrandDTO add(BrandDTO brandDTO);

    public BrandDTO getById(Integer id);

    public List<BrandDTO> getAll();

    public void deleteById(Integer id);

    public void save(BrandDTO brandDTO);
}
