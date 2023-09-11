package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.QuickBookCategoryDTO;
import com.rampcard.rampcardservice.exception.QuickBookCategoryNotFoundException;
import com.rampcard.rampcardservice.service.QuickBookCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quickbook-category")
public class QuickBookCategoryController {
    private final QuickBookCategoryService quickBookCategoryService;

    @Autowired
    public QuickBookCategoryController(QuickBookCategoryService quickBookCategoryService) {
        this.quickBookCategoryService = quickBookCategoryService;
    }

    @GetMapping("/")
    public ResponseEntity<List<QuickBookCategoryDTO>> getAll() {
        List<QuickBookCategoryDTO> quickBookCategoryDTOList = quickBookCategoryService.getAll();
        return ResponseEntity.ok(quickBookCategoryDTOList);
    }

    @PostMapping("/")
    public ResponseEntity<QuickBookCategoryDTO> add(@RequestBody QuickBookCategoryDTO quickBookCategoryDTO) {
        QuickBookCategoryDTO quickBookCategoryDTO1 = quickBookCategoryService.add(quickBookCategoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(quickBookCategoryDTO1);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuickBookCategoryDTO> getById(@PathVariable Integer id) {
        QuickBookCategoryDTO quickBookCategoryDTO = quickBookCategoryService.getById(id);
        if(quickBookCategoryDTO != null) {
            return ResponseEntity.ok(quickBookCategoryDTO);
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<QuickBookCategoryDTO> updateById(@PathVariable Integer id, @RequestBody QuickBookCategoryDTO quickBookCategoryDTO) {
        QuickBookCategoryDTO updatedQuickBookCategory = quickBookCategoryService.updateById(id, quickBookCategoryDTO);

        if (updatedQuickBookCategory != null) {
            return ResponseEntity.ok(updatedQuickBookCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Integer id) {
        QuickBookCategoryDTO quickBookCategoryDTO = quickBookCategoryService.getById(id);

        if(quickBookCategoryDTO == null) {
            throw new QuickBookCategoryNotFoundException(id);
        }

        quickBookCategoryService.deleteById(id);
        return "Deleted user id - " + id;
    }
}
