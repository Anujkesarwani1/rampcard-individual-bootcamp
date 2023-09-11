package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.exception.QuickBookCategoryNotFoundException;
import com.rampcard.rampcardservice.service.QuickBookCategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class QuickBookCategoryControllerTest {

    @Mock
    private QuickBookCategoryService quickBookCategoryService;

    @InjectMocks
    private QuickBookCategoryController quickBookCategoryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllQuickBookCategories() {
        List<QuickBookCategoryDTO> categoryDTOList = new ArrayList<>();
        categoryDTOList.add(new QuickBookCategoryDTO());
        categoryDTOList.add(new QuickBookCategoryDTO());

        when(quickBookCategoryService.getAll()).thenReturn(categoryDTOList);

        ResponseEntity<List<QuickBookCategoryDTO>> responseEntity = quickBookCategoryController.getAll();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, Objects.requireNonNull(responseEntity.getBody()).size());
    }

    @Test
    void testGetQuickBookCategoryById() {
        int categoryId = 1;
        QuickBookCategoryDTO categoryDTO = new QuickBookCategoryDTO();
        when(quickBookCategoryService.getById(categoryId)).thenReturn(categoryDTO);

        ResponseEntity<QuickBookCategoryDTO> responseEntity = quickBookCategoryController.getById(categoryId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(categoryDTO, responseEntity.getBody());
    }

    @Test
    void testGetQuickBookCategoryByIdNotFound() {
        int categoryId = 1;
        when(quickBookCategoryService.getById(categoryId)).thenReturn(null);

        ResponseEntity<QuickBookCategoryDTO> responseEntity = quickBookCategoryController.getById(categoryId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testCreateQuickBookCategory() {
        QuickBookCategoryDTO categoryDTO = new QuickBookCategoryDTO();
        when(quickBookCategoryService.add(categoryDTO)).thenReturn(categoryDTO);

        ResponseEntity<QuickBookCategoryDTO> responseEntity = quickBookCategoryController.add(categoryDTO);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(categoryDTO, responseEntity.getBody());
    }

    @Test
    void testUpdateQuickBookCategory() {
        int categoryId = 1;
        QuickBookCategoryDTO categoryDTO = new QuickBookCategoryDTO();
        when(quickBookCategoryService.updateById(categoryId, categoryDTO)).thenReturn(categoryDTO);

        ResponseEntity<QuickBookCategoryDTO> responseEntity = quickBookCategoryController.updateById(categoryId, categoryDTO);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(categoryDTO, responseEntity.getBody());
    }

    @Test
    void testUpdateQuickBookCategoryNotFound() {
        int categoryId = 1;
        QuickBookCategoryDTO categoryDTO = new QuickBookCategoryDTO();
        when(quickBookCategoryService.updateById(categoryId, categoryDTO)).thenReturn(null);

        ResponseEntity<QuickBookCategoryDTO> responseEntity = quickBookCategoryController.updateById(categoryId, categoryDTO);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testDeleteQuickBookCategory() {
        int categoryId = 1;
        QuickBookCategoryDTO categoryDTO = new QuickBookCategoryDTO();
        when(quickBookCategoryService.getById(categoryId)).thenReturn(categoryDTO);

        String response = quickBookCategoryController.deleteById(categoryId);

        assertEquals("Deleted user id - " + categoryId, response);
        verify(quickBookCategoryService, times(1)).deleteById(categoryId);
    }

    @Test
    void testDeleteQuickBookCategoryNotFound() {
        int categoryId = 1;
        when(quickBookCategoryService.getById(categoryId)).thenReturn(null);

        assertThrows(QuickBookCategoryNotFoundException.class, () -> quickBookCategoryController.deleteById(categoryId));
        verify(quickBookCategoryService, times(0)).deleteById(anyInt());
    }
}
