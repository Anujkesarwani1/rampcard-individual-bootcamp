package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.*;
import com.rampcard.rampcardservice.exception.TransactionNotFoundException;
import com.rampcard.rampcardservice.service.BrandService;
import com.rampcard.rampcardservice.service.TransactionService;
import com.rampcard.rampcardservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    private BrandService brandService;

    @Autowired
    private UserService userService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/")
    public ResponseEntity<List<TransactionDTO>> getAll() {
        List<TransactionDTO> transactionDTOList = transactionService.getAll();
        return ResponseEntity.ok(transactionDTOList);
    }

    @PostMapping("/")
    public ResponseEntity<TransactionDTO> add(@RequestBody TransactionDTO transactionDTO) {
        TransactionDTO createdTransaction = transactionService.add(transactionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTransaction);
    }

    @GetMapping("/{transactionId}/quickbook-categories")
    public ResponseEntity<List<QuickBookCategoryDTO>> getQuickBookCategories(@PathVariable Integer transactionId) {
        List<QuickBookCategoryDTO> categories = transactionService.getQuickBookCategoriesById(transactionId);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getById(@PathVariable Integer id) {
        TransactionDTO transactionDTO = transactionService.getById(id);
        if (transactionDTO != null) {
            return ResponseEntity.ok(transactionDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateById(@PathVariable Integer id, @RequestBody TransactionDTO transactionDTO) {
        TransactionDTO updatedTransaction = transactionService.updateById(id, transactionDTO);

        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) {
        TransactionDTO transactionDTO = transactionService.getById(id);

        if (transactionDTO == null) {
            throw new TransactionNotFoundException(id);
        }

        transactionService.deleteById(id);
        return ResponseEntity.ok("Deleted transaction with ID: " + id);
    }

    @GetMapping("/details")
    public ResponseEntity<List<TransactionDetailsDTO>> getAllDetails() {
        List<TransactionDetailsDTO> transactionDetailsDTOs = new ArrayList<>();

        List<TransactionDTO> allTransactions = transactionService.getAll();

        for (TransactionDTO transactionDTO : allTransactions) {
            BrandDTO brandDTO = null;
            UserDTO userDTO = null;
            if(transactionDTO.getBrandId() != null) {
                brandDTO = brandService.getById(transactionDTO.getBrandId());
            }
            if(transactionDTO.getUserId() != null) {
                userDTO = userService.getById(transactionDTO.getUserId());
            }

            List<QuickBookCategoryDTO> categories = transactionService
                    .getQuickBookCategoriesById(transactionDTO.getId());

            TransactionDetailsDTO transactionDetailsDTO = new TransactionDetailsDTO();
            transactionDetailsDTO.setAmount(transactionDTO.getAmount());

            if (brandDTO != null) {
                BrandDTO brandDTO1 = new BrandDTO();
                brandDTO1.setId(brandDTO.getId());
                brandDTO1.setLabel(brandDTO.getLabel());
                brandDTO1.setSubLabel(brandDTO.getSubLabel());
                transactionDetailsDTO.setBrand(brandDTO1);
            }

            transactionDetailsDTO.setDate(transactionDTO.getDate());
            transactionDetailsDTO.setId(transactionDTO.getId());
            transactionDetailsDTO.setMemo(transactionDTO.getMemo());
            transactionDetailsDTO.setQuickBooksCategory(categories);
            transactionDetailsDTO.setReceipt(transactionDTO.getReceipt());
            transactionDetailsDTO.setSync(transactionDTO.getSync());

            if (userDTO != null) {
                UserDTO userDTO1 = new UserDTO();
                userDTO1.setId(userDTO.getId());
                userDTO1.setName(userDTO.getName());
                userDTO1.setVirtualName(userDTO.getVirtualName());
                transactionDetailsDTO.setUser(userDTO1);
            }

            transactionDetailsDTOs.add(transactionDetailsDTO);
        }

        return ResponseEntity.ok(transactionDetailsDTOs);
    }
}
