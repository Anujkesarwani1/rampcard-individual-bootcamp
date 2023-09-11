package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;

import java.util.List;

public interface QuickBookCategoryService {
    public QuickBookCategoryDTO add(QuickBookCategoryDTO quickBookCategoryDTO);

    public QuickBookCategoryDTO getById(Integer id);

    public List<QuickBookCategoryDTO> getAll();

    public void deleteById(Integer id);

    public void save(QuickBookCategoryDTO quickBookCategoryDTO);

    public QuickBookCategoryDTO updateById(Integer id, QuickBookCategoryDTO quickBookCategoryDTO);
}
