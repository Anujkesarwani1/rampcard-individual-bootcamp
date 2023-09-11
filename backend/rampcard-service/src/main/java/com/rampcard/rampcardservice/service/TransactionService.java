package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.dto.TransactionDTO;
import com.rampcard.rampcardservice.entity.Transaction;

import java.util.List;

public interface TransactionService {

    public TransactionDTO add(TransactionDTO transactionDTO);

    public List<TransactionDTO> getAll();

    public void deleteById(Integer id);

    public void save(Transaction transaction);

    public TransactionDTO updateById(Integer id, TransactionDTO transactionDTO);

    public List<QuickBookCategoryDTO> getQuickBookCategoriesById(Integer transactionId);

    public TransactionDTO getById(Integer id);

    public TransactionDTO enhanceWithQuickBookCategories(Transaction transaction);
}
