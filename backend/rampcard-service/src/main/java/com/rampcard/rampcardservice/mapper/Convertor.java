package com.rampcard.rampcardservice.mapper;

import org.modelmapper.ModelMapper;

public class Convertor {
    private Convertor() {
        throw new IllegalStateException("Utility class");
    }

    private static final ModelMapper modelMapper = new ModelMapper();

    public static <T, U> T convertToDTO(U entity, Class<T> dtoClass) {
        return modelMapper.map(entity, dtoClass);
    }

    public static <T, U> U convertToEntity(T dto, Class<U> entityClass) {
        return modelMapper.map(dto, entityClass);
    }
}
