package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.BrandDTO;
import com.rampcard.rampcardservice.entity.Brand;
import com.rampcard.rampcardservice.mapper.Convertor;
import com.rampcard.rampcardservice.repository.BrandRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

class BrandServiceTest {

    private BrandService brandService;

    @Mock
    private BrandRepository brandRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ModelMapper modelMapper = new ModelMapper();
        brandService = new BrandServiceImpl(brandRepository, modelMapper);
    }
    @Test
    void testConvertToDTO() {
        Brand brand = new Brand(1, "Test Label", "Test SubLabel");

        BrandDTO brandDTO = Convertor.convertToDTO(brand, BrandDTO.class);

        assertEquals(brand.getId(), brandDTO.getId());
        assertEquals(brand.getLabel(), brandDTO.getLabel());
        assertEquals(brand.getSubLabel(), brandDTO.getSubLabel());
    }

    @Test
    void testConvertToEntity() {
        BrandDTO brandDTO = new BrandDTO(1, "Test Label", "Test SubLabel");

        Brand brand = Convertor.convertToEntity(brandDTO, Brand.class);

        assertEquals(brandDTO.getId(), brand.getId());
        assertEquals(brandDTO.getLabel(), brand.getLabel());
        assertEquals(brandDTO.getSubLabel(), brand.getSubLabel());
    }

    @Test
    void testAddBrand() {
        BrandDTO brandDTO = new BrandDTO(1, "Test Label", "Test SubLabel");

        Brand brand = new Brand(1, "Test Label", "Test SubLabel");

        when(brandRepository.save(any())).thenReturn(brand);

        BrandDTO createdBrandDTO = brandService.add(brandDTO);

        assertEquals(brand.getId(), createdBrandDTO.getId());
        assertEquals(brand.getLabel(), createdBrandDTO.getLabel());
        assertEquals(brand.getSubLabel(), createdBrandDTO.getSubLabel());
    }

    @Test
    void testGetBrandById() {
        int id = 1;
        Brand brand = new Brand(1, "Test Label", "Test SubLabel");

        when(brandRepository.findById(id)).thenReturn(Optional.of(brand));

        BrandDTO brandDTO = brandService.getById(id);

        assertEquals(brand.getId(), brandDTO.getId());
        assertEquals(brand.getLabel(), brandDTO.getLabel());
        assertEquals(brand.getSubLabel(), brandDTO.getSubLabel());

        verify(brandRepository, times(1)).findById(id);
    }

    @Test
    void testGetBrandByIdNotFound() {
        int id = 1;
        when(brandRepository.findById(id)).thenReturn(Optional.empty());

        BrandDTO brandDTO = brandService.getById(id);

        assertNull(brandDTO);
    }

    @Test
    void testGetAllBrand() {
        List<Brand> brandList = new ArrayList<>();
        brandList.add(new Brand(1, "Label 1", "SubLabel 1"));
        brandList.add(new Brand(2, "Label 2", "SubLabel 2"));

        when(brandRepository.findAll()).thenReturn(brandList);

        List<BrandDTO> brandDTOList = brandService.getAll();

        assertEquals(brandList.size(), brandDTOList.size());
    }

    @Test
    void testDeleteById() {
        int id = 1;

        brandService.deleteById(id);

        verify(brandRepository, times(1)).deleteById(id);
    }

    @Test
    void testSave() {
        BrandDTO brandDTO = new BrandDTO(1, "Test Label", "Test SubLabel");

        Brand brand = new Brand(1, "Test Label", "Test SubLabel");

        brandService.save(brandDTO);

        verify(brandRepository, times(1)).save(any());
    }
}
