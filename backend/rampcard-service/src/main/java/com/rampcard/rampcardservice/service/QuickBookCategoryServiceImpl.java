package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.entity.QuickBookCategory;
import com.rampcard.rampcardservice.mapper.Convertor;
import com.rampcard.rampcardservice.repository.QuickBookCategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuickBookCategoryServiceImpl implements QuickBookCategoryService {
    private final QuickBookCategoryRepository quickBookCategoryRepository;

    @Autowired
    public QuickBookCategoryServiceImpl(QuickBookCategoryRepository quickBookCategoryRepository, ModelMapper modelMapper) {
        this.quickBookCategoryRepository = quickBookCategoryRepository;
    }

    @Override
    public QuickBookCategoryDTO add(QuickBookCategoryDTO quickBookCategoryDTO) {
        QuickBookCategory quickBookCategory = quickBookCategoryRepository
                .save(Convertor.convertToEntity(quickBookCategoryDTO, QuickBookCategory.class));
        return Convertor.convertToDTO(quickBookCategory, QuickBookCategoryDTO.class);
    }

    @Override
    public QuickBookCategoryDTO getById(Integer id) {
        Optional<QuickBookCategory> quickBookCategory = quickBookCategoryRepository.findById(id);
        return quickBookCategory.map(entity -> Convertor.convertToDTO(entity, QuickBookCategoryDTO.class)).orElse(null);
    }

    @Override
    public List<QuickBookCategoryDTO> getAll() {
        List<QuickBookCategory> quickBookCategoryList = quickBookCategoryRepository.findAll();
        return quickBookCategoryList.stream()
                .map(entity -> Convertor.convertToDTO(entity, QuickBookCategoryDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public void deleteById(Integer id) {
        quickBookCategoryRepository.deleteById(id);
    }

    @Override
    public void save(QuickBookCategoryDTO quickBookCategoryDTO) {
        quickBookCategoryRepository.save(Convertor.convertToEntity(quickBookCategoryDTO, QuickBookCategory.class));
    }

    @Override
    public QuickBookCategoryDTO updateById(Integer id, QuickBookCategoryDTO quickBookCategoryDTO) {
        Optional<QuickBookCategory> existingQuickBookCategoryOptional = quickBookCategoryRepository.findById(id);

        existingQuickBookCategoryOptional.ifPresent(existingQuickBookCategory -> {
            existingQuickBookCategory.setLabel(quickBookCategoryDTO.getLabel());
            quickBookCategoryRepository.save(existingQuickBookCategory);
        });

        return existingQuickBookCategoryOptional
                .map(existingQuickBookCategory -> Convertor.convertToDTO(existingQuickBookCategory, QuickBookCategoryDTO.class))
                .orElse(null);
    }
}
