package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.BrandDTO;
import com.rampcard.rampcardservice.exception.BrandNotFoundException;
import com.rampcard.rampcardservice.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brand")
public class BrandController {

    private final BrandService brandService;

    @Autowired
    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/")
    public ResponseEntity<List<BrandDTO>> getAll() {
        List<BrandDTO> brandDTOS = brandService.getAll();
        return ResponseEntity.ok(brandDTOS);
    }

    @PostMapping("/")
    public ResponseEntity<BrandDTO> add(@RequestBody BrandDTO brandDTO) {
        BrandDTO createBrand = brandService.add(brandDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createBrand);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDTO> getById(@PathVariable Integer id) {
        BrandDTO brandDTO = brandService.getById(id);
        if (brandDTO != null) {
            return ResponseEntity.ok(brandDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Integer id) {
        BrandDTO brandDTO = brandService.getById(id);

        if(brandDTO == null) {
            throw new BrandNotFoundException(id);
        }

        brandService.deleteById(id);
        return "Deleted user id - " + id;
    }
}
