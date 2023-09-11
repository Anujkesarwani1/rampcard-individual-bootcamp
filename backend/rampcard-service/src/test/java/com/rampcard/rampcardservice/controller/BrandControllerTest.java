package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.BrandDTO;
import com.rampcard.rampcardservice.exception.BrandNotFoundException;
import com.rampcard.rampcardservice.service.BrandService;
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


class BrandControllerTest {

    @Mock
    private BrandService brandService;

    @InjectMocks
    private BrandController brandController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBrands() {
        List<BrandDTO> brandDTOList = new ArrayList<>();
        brandDTOList.add(new BrandDTO());
        brandDTOList.add(new BrandDTO());

        when(brandService.getAll()).thenReturn(brandDTOList);

        ResponseEntity<List<BrandDTO>> responseEntity = brandController.getAll();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, Objects.requireNonNull(responseEntity.getBody()).size());
    }

    @Test
    void testGetBrandById() {
        int brandId = 1;
        BrandDTO brandDTO = new BrandDTO();
        when(brandService.getById(brandId)).thenReturn(brandDTO);

        ResponseEntity<BrandDTO> responseEntity = brandController.getById(brandId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(brandDTO, responseEntity.getBody());
    }

    @Test
    void testGetBrandByIdNotFound() {
        int brandId = 1;
        when(brandService.getById(brandId)).thenReturn(null);

        ResponseEntity<BrandDTO> responseEntity = brandController.getById(brandId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testCreateBrand() {
        BrandDTO brandDTO = new BrandDTO();
        when(brandService.add(brandDTO)).thenReturn(brandDTO);

        ResponseEntity<BrandDTO> responseEntity = brandController.add(brandDTO);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(brandDTO, responseEntity.getBody());
    }

    @Test
    void testDeleteBrand() {
        int brandId = 1;
        BrandDTO brandDTO = new BrandDTO();
        when(brandService.getById(brandId)).thenReturn(brandDTO);

        String response = brandController.deleteById(brandId);

        assertEquals("Deleted user id - " + brandId, response);
        verify(brandService, times(1)).deleteById(brandId);
    }


    @Test
    void testDeleteBrandNotFound() {
        int brandId = 1;
        when(brandService.getById(brandId)).thenReturn(null);

        assertThrows(BrandNotFoundException.class, () -> brandController.deleteById(brandId));
        verify(brandService, times(0)).deleteById(anyInt());
    }
}
