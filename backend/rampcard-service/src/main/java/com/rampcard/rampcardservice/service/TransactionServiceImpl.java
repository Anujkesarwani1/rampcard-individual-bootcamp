package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.dto.TransactionDTO;
import com.rampcard.rampcardservice.entity.QuickBookCategory;
import com.rampcard.rampcardservice.entity.Transaction;
import com.rampcard.rampcardservice.mapper.Convertor;
import com.rampcard.rampcardservice.repository.TransactionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService{

    private final QuickBookCategoryService quickBookCategoryService;

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionServiceImpl(QuickBookCategoryService quickBookCategoryService, TransactionRepository transactionRepository, ModelMapper modelMapper) {
        this.transactionRepository = transactionRepository;
        this.quickBookCategoryService = quickBookCategoryService;
    }

    @Override
    public TransactionDTO add(TransactionDTO transactionDTO) {
        Transaction newTransaction = Convertor.convertToEntity(transactionDTO, Transaction.class);

        List<Integer> quickBookCategoryIds = transactionDTO.getQuickBookCategoryIds();
        List<QuickBookCategory> quickBookCategories = quickBookCategoryIds.stream()
                .map(quickBookCategoryService::getById)
                .map(dto -> Convertor.convertToEntity(dto, QuickBookCategory.class))
                .collect(Collectors.toList());

        newTransaction.setQuickBooksCategories(quickBookCategories);

        newTransaction = transactionRepository.save(newTransaction);
        return Convertor.convertToDTO(newTransaction, TransactionDTO.class);
    }


    @Override
    public List<TransactionDTO> getAll() {
        List<Transaction> transactionList = transactionRepository.findAll();
        return transactionList.stream()
                .map(this::enhanceWithQuickBookCategories)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDTO enhanceWithQuickBookCategories(Transaction transaction) {
        TransactionDTO transactionDTO = Convertor.convertToDTO(transaction, TransactionDTO.class);
        if ((Optional.ofNullable(transactionDTO.getQuickBookCategoryIds()).isEmpty())) {
            List<QuickBookCategoryDTO> categories = getQuickBookCategoriesById(transactionDTO.getId());
            List<Integer> categoryIds = categories.stream()
                    .map(QuickBookCategoryDTO::getId)
                    .collect(Collectors.toList());
            transactionDTO.setQuickBookCategoryIds(categoryIds);
        }
        return transactionDTO;
    }

    @Override
    public void deleteById(Integer id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public void save(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    @Override
    public TransactionDTO updateById(Integer id, TransactionDTO transactionDTO) {
        Optional<Transaction> existingTransactionOptional = transactionRepository.findById(id);

        existingTransactionOptional.ifPresent(existingTransaction -> {
            existingTransaction.setAmount(transactionDTO.getAmount());
            existingTransaction.setDate(transactionDTO.getDate());
            existingTransaction.setReceipt(transactionDTO.getReceipt());
            existingTransaction.setMemo(transactionDTO.getMemo());
            existingTransaction.setSync(transactionDTO.getSync());
            transactionRepository.save(existingTransaction);
        });

        return existingTransactionOptional
                .map(entity -> Convertor.convertToDTO(entity, TransactionDTO.class))
                .orElse(null);
    }

    @Override
    public List<QuickBookCategoryDTO> getQuickBookCategoriesById(Integer transactionId) {
        List<QuickBookCategory> categories = transactionRepository.findQuickBooksCategoriesByTransactionId(transactionId);
        return categories.stream()
                .map(entity -> Convertor.convertToDTO(entity, QuickBookCategoryDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public TransactionDTO getById(Integer id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()) {
            TransactionDTO transactionDTO = Convertor.convertToDTO(transaction.get(), TransactionDTO.class);
            List<QuickBookCategoryDTO> categories = getQuickBookCategoriesById(id);
            List<Integer> categoryIds = categories.stream()
                    .map(QuickBookCategoryDTO::getId)
                    .collect(Collectors.toList());
            transactionDTO.setQuickBookCategoryIds(categoryIds);
            return transactionDTO;
        }
        return null;
    }
}
