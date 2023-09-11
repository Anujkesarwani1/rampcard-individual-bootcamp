package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.entity.QuickBookCategory;
import com.rampcard.rampcardservice.repository.QuickBookCategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
class QuickBookCategoryServiceTest {

    private QuickBookCategoryService quickBookCategoryService;

    @Mock
    private QuickBookCategoryRepository quickBookCategoryRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ModelMapper modelMapper = new ModelMapper();
        quickBookCategoryService = new QuickBookCategoryServiceImpl(quickBookCategoryRepository, modelMapper);
    }

    @Test
    void testGetQuickBookCategoryById() {
        int id = 1;
        QuickBookCategory quickBookCategory = new QuickBookCategory(1, "Test Label");

        when(quickBookCategoryRepository.findById(id)).thenReturn(Optional.of(quickBookCategory));

        QuickBookCategoryDTO quickBookCategoryDTO = quickBookCategoryService.getById(id);

        assertEquals(quickBookCategory.getId(), quickBookCategoryDTO.getId());
        assertEquals(quickBookCategory.getLabel(), quickBookCategoryDTO.getLabel());

        verify(quickBookCategoryRepository, times(1)).findById(id);
    }

    @Test
    void testGetAllQuickBookCategory() {
        List<QuickBookCategory> quickBookCategoryList = new ArrayList<>();
        quickBookCategoryList.add(new QuickBookCategory(1, "Category 1"));
        quickBookCategoryList.add(new QuickBookCategory(2, "Category 2"));

        when(quickBookCategoryRepository.findAll()).thenReturn(quickBookCategoryList);

        List<QuickBookCategoryDTO> quickBookCategoryDTOList = quickBookCategoryService.getAll();

        assertEquals(quickBookCategoryList.size(), quickBookCategoryDTOList.size());

        verify(quickBookCategoryRepository, times(1)).findAll();
    }

    @Test
    void testAddQuickBookCategory() {
        QuickBookCategoryDTO quickBookCategoryDTO = new QuickBookCategoryDTO();
        quickBookCategoryDTO.setLabel("New Category");

        QuickBookCategory savedQuickBookCategory = new QuickBookCategory(1, "New Category");

        when(quickBookCategoryRepository.save(any())).thenReturn(savedQuickBookCategory);

        QuickBookCategoryDTO createdCategory = quickBookCategoryService.add(quickBookCategoryDTO);

        assertEquals(savedQuickBookCategory.getId(), createdCategory.getId());
        assertEquals(savedQuickBookCategory.getLabel(), createdCategory.getLabel());

        verify(quickBookCategoryRepository, times(1)).save(any());
    }

    @Test
    void testDeleteQuickBookCategoryById() {
        int id = 1;

        quickBookCategoryService.deleteById(id);

        verify(quickBookCategoryRepository, times(1)).deleteById(id);
    }

    @Test
    void testUpdateQuickBookCategory() {
        int id = 1;
        QuickBookCategoryDTO updatedDTO = new QuickBookCategoryDTO();
        updatedDTO.setLabel("Updated Category");

        QuickBookCategory existingCategory = new QuickBookCategory(id, "Old Category");
        when(quickBookCategoryRepository.findById(id)).thenReturn(Optional.of(existingCategory));
        when(quickBookCategoryRepository.save(any())).thenReturn(existingCategory);

        QuickBookCategoryDTO updatedCategory = quickBookCategoryService.updateById(id, updatedDTO);

        assertEquals(existingCategory.getId(), updatedCategory.getId());
        assertEquals(updatedDTO.getLabel(), updatedCategory.getLabel());

        verify(quickBookCategoryRepository, times(1)).findById(id);
        verify(quickBookCategoryRepository, times(1)).save(any());
    }

    @Test
    void testSaveQuickBookCategory() {
        QuickBookCategoryDTO categoryDTO = new QuickBookCategoryDTO();
        categoryDTO.setId(1);
        categoryDTO.setLabel("Expense");

        QuickBookCategory categoryToSave = new QuickBookCategory();
        categoryToSave.setId(categoryDTO.getId());
        categoryToSave.setLabel(categoryDTO.getLabel());

        when(quickBookCategoryRepository.save(any(QuickBookCategory.class))).thenReturn(categoryToSave);

        quickBookCategoryService.save(categoryDTO);

        verify(quickBookCategoryRepository, times(1)).save(categoryToSave);
    }
}
