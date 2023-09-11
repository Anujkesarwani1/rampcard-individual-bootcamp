package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.dto.TransactionDTO;
import com.rampcard.rampcardservice.entity.QuickBookCategory;
import com.rampcard.rampcardservice.entity.Transaction;
import com.rampcard.rampcardservice.repository.TransactionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    private TransactionService transactionService;

    @Mock
    private QuickBookCategoryService quickBookCategoryService;

    @Mock
    private TransactionRepository transactionRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ModelMapper modelMapper = new ModelMapper();
        transactionService = new TransactionServiceImpl(quickBookCategoryService, transactionRepository, modelMapper);
    }

    @Test
    void testAddTransaction() {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setAmount("100");
        transactionDTO.setQuickBookCategoryIds(Arrays.asList(1, 2));

        QuickBookCategoryDTO categoryDTO1 = new QuickBookCategoryDTO();
        categoryDTO1.setId(1);
        QuickBookCategoryDTO categoryDTO2 = new QuickBookCategoryDTO();
        categoryDTO2.setId(2);

        when(quickBookCategoryService.getById(1)).thenReturn(categoryDTO1);
        when(quickBookCategoryService.getById(2)).thenReturn(categoryDTO2);

        Transaction savedTransaction = new Transaction(1, "100");

        when(transactionRepository.save(any())).thenReturn(savedTransaction);

        TransactionDTO createdTransaction = transactionService.add(transactionDTO);

        assertNotNull(createdTransaction);
        assertEquals(savedTransaction.getId(), createdTransaction.getId());
        assertEquals(savedTransaction.getAmount(), createdTransaction.getAmount());

        verify(quickBookCategoryService, times(2)).getById(anyInt());
        verify(transactionRepository, times(1)).save(any());
    }

    @Test
    void testGetAllTransactions() {
        List<Transaction> transactionList = new ArrayList<>();
        transactionList.add(new Transaction(1, "100"));
        transactionList.add(new Transaction(2, "200"));

        when(transactionRepository.findAll()).thenReturn(transactionList);

        List<TransactionDTO> transactionDTOList = transactionService.getAll();

        assertEquals(transactionList.size(), transactionDTOList.size());

        verify(transactionRepository, times(1)).findAll();
    }

    @Test
    void testGetTransactionById() {
        int id = 1;
        Transaction transaction = new Transaction(1, "100");

        when(transactionRepository.findById(id)).thenReturn(Optional.of(transaction));

        TransactionDTO transactionDTO = transactionService.getById(id);

        assertNotNull(transactionDTO);
        assertEquals(transaction.getId(), transactionDTO.getId());
        assertEquals(transaction.getAmount(), transactionDTO.getAmount());

        verify(transactionRepository, times(1)).findById(id);
    }

    @Test
    void testUpdateTransaction() {
        int id = 1;
        TransactionDTO updatedDTO = new TransactionDTO();
        updatedDTO.setAmount("150");

        Transaction existingTransaction = new Transaction(1, "100");

        when(transactionRepository.findById(id)).thenReturn(Optional.of(existingTransaction));
        when(transactionRepository.save(any())).thenReturn(existingTransaction);

        TransactionDTO updatedTransaction = transactionService.updateById(id, updatedDTO);

        assertNotNull(updatedTransaction);
        assertEquals(existingTransaction.getId(), updatedTransaction.getId());
        assertEquals(updatedDTO.getAmount(), updatedTransaction.getAmount());

        verify(transactionRepository, times(1)).findById(id);
        verify(transactionRepository, times(1)).save(any());
    }

    @Test
    void testGetQuickBookCategoriesByTransactionId() {
        int transactionId = 1;
        QuickBookCategory category1 = new QuickBookCategory(1, "Category 1");
        QuickBookCategory category2 = new QuickBookCategory(2, "Category 2");
        List<QuickBookCategory> categories = Arrays.asList(category1, category2);

        when(transactionRepository.findQuickBooksCategoriesByTransactionId(transactionId))
                .thenReturn(categories);

        List<QuickBookCategoryDTO> categoryDTOs = transactionService.getQuickBookCategoriesById(transactionId);

        assertNotNull(categoryDTOs);
        assertEquals(categories.size(), categoryDTOs.size());

        verify(transactionRepository, times(1)).findQuickBooksCategoriesByTransactionId(transactionId);
    }

    @Test
    void testDeleteByTransactionId() {
        int transactionId = 1;

        transactionService.deleteById(transactionId);

        verify(transactionRepository, times(1)).deleteById(transactionId);
    }

    @Test
    void testSaveTransaction() {
        Transaction transaction = new Transaction(1, "100");

        when(transactionRepository.save(any())).thenReturn(transaction);

        transactionService.save(transaction);

        verify(transactionRepository, times(1)).save(transaction);
    }

    @Test
    void testGetTransactionByIdWithQuickBookCategories() {
        int transactionId = 1;

        Transaction transaction = new Transaction(transactionId, "100");
        when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(transaction));

        QuickBookCategoryDTO categoryDTO1 = new QuickBookCategoryDTO();
        categoryDTO1.setId(1);
        QuickBookCategoryDTO categoryDTO2 = new QuickBookCategoryDTO();
        categoryDTO2.setId(2);

        List<QuickBookCategoryDTO> categories = Arrays.asList(categoryDTO1, categoryDTO2);
        when(quickBookCategoryService.getById(transactionId))
                .thenAnswer(invocation -> categories);

        TransactionDTO transactionDTO = transactionService
                .getById(transactionId);

        assertNotNull(transactionDTO);
        Assertions.assertEquals(transaction.getId(), transactionDTO.getId());
        Assertions.assertEquals(transaction.getAmount(), transactionDTO.getAmount());
    }
}
