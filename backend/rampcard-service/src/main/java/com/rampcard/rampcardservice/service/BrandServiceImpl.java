package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.BrandDTO;
import com.rampcard.rampcardservice.entity.Brand;
import com.rampcard.rampcardservice.mapper.Convertor;
import com.rampcard.rampcardservice.repository.BrandRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Autowired
    public BrandServiceImpl(BrandRepository brandRepository, ModelMapper modelMapper) {
        this.brandRepository = brandRepository;
    }

    @Override
    public BrandDTO add(BrandDTO brandDTO) {
        Brand brand = brandRepository.save(Convertor.convertToEntity(brandDTO, Brand.class));
        return Convertor.convertToDTO(brand, BrandDTO.class);
    }

    @Override
    public BrandDTO getById(Integer id) {
        Optional<Brand> brand = brandRepository.findById(id);
        return brand.map(entity -> Convertor.convertToDTO(entity, BrandDTO.class)).orElse(null);
    }

    @Override
    public List<BrandDTO> getAll() {
        List<Brand> brandList = brandRepository.findAll();
        return brandList.stream()
                .map(entity -> Convertor.convertToDTO(entity, BrandDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Integer id) {
        brandRepository.deleteById(id);
    }

    @Override
    public void save(BrandDTO brandDTO) {
        brandRepository.save(Convertor.convertToEntity(brandDTO, Brand.class));
    }
}
