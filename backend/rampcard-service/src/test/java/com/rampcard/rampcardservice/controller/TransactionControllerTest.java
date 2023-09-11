package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.dto.TransactionDTO;
import com.rampcard.rampcardservice.exception.TransactionNotFoundException;
import com.rampcard.rampcardservice.service.BrandService;
import com.rampcard.rampcardservice.service.TransactionService;
import com.rampcard.rampcardservice.service.UserService;
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

class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @Mock
    private BrandService brandService;

    @Mock
    private UserService userService;

    @InjectMocks
    private TransactionController transactionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTransactions() {
        List<TransactionDTO> transactionDTOList = new ArrayList<>();
        transactionDTOList.add(new TransactionDTO());
        transactionDTOList.add(new TransactionDTO());

        when(transactionService.getAll()).thenReturn(transactionDTOList);

        ResponseEntity<List<TransactionDTO>> responseEntity = transactionController.getAll();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, Objects.requireNonNull(responseEntity.getBody()).size());
    }

    @Test
    void testCreateTransaction() {
        TransactionDTO transactionDTO = new TransactionDTO();
        when(transactionService.add(transactionDTO)).thenReturn(transactionDTO);

        ResponseEntity<TransactionDTO> responseEntity = transactionController.add(transactionDTO);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(transactionDTO, responseEntity.getBody());
    }

    @Test
    void testGetQuickBookCategoriesByTransactionId() {
        int transactionId = 1;
        List<QuickBookCategoryDTO> categoryDTOList = new ArrayList<>();
        categoryDTOList.add(new QuickBookCategoryDTO());
        categoryDTOList.add(new QuickBookCategoryDTO());

        when(transactionService.getQuickBookCategoriesById(transactionId)).thenReturn(categoryDTOList);

        ResponseEntity<List<QuickBookCategoryDTO>> responseEntity = transactionController.getQuickBookCategories(transactionId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, Objects.requireNonNull(responseEntity.getBody()).size());
    }

    @Test
    void testGetTransactionById() {
        int transactionId = 1;
        TransactionDTO transactionDTO = new TransactionDTO();
        when(transactionService.getById(transactionId)).thenReturn(transactionDTO);

        ResponseEntity<TransactionDTO> responseEntity = transactionController.getById(transactionId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(transactionDTO, responseEntity.getBody());
    }

    @Test
    void testGetTransactionByIdNotFound() {
        int transactionId = 1;
        when(transactionService.getById(transactionId)).thenReturn(null);

        ResponseEntity<TransactionDTO> responseEntity = transactionController.getById(transactionId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testUpdateTransaction() {
        int transactionId = 1;
        TransactionDTO transactionDTO = new TransactionDTO();
        when(transactionService.updateById(transactionId, transactionDTO)).thenReturn(transactionDTO);

        ResponseEntity<TransactionDTO> responseEntity = transactionController.updateById(transactionId, transactionDTO);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(transactionDTO, responseEntity.getBody());
    }

    @Test
    void testUpdateTransactionNotFound() {
        int transactionId = 1;
        TransactionDTO transactionDTO = new TransactionDTO();
        when(transactionService.updateById(transactionId, transactionDTO)).thenReturn(null);

        ResponseEntity<TransactionDTO> responseEntity = transactionController.updateById(transactionId, transactionDTO);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testDeleteTransaction() {
        int transactionId = 1;
        TransactionDTO transactionDTO = new TransactionDTO();
        when(transactionService.getById(transactionId)).thenReturn(transactionDTO);

        ResponseEntity<String> responseEntity = transactionController.deleteById(transactionId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Deleted transaction with ID: " + transactionId, responseEntity.getBody());
        verify(transactionService, times(1)).deleteById(transactionId);
    }

    @Test
    void testDeleteTransactionNotFound() {
        int transactionId = 1;
        when(transactionService.getById(transactionId)).thenReturn(null);

        TransactionNotFoundException exception = assertThrows(TransactionNotFoundException.class,
                () -> transactionController.deleteById(transactionId));

        assertEquals("Brand not found with ID: " + transactionId, exception.getMessage());
        verify(transactionService, times(0)).deleteById(anyInt());
    }
}
