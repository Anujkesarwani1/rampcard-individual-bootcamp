package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.RampcardStatusDTO;
import com.rampcard.rampcardservice.entity.RampcardStatus;
import com.rampcard.rampcardservice.exception.RampcardStatusNotFoundException;
import com.rampcard.rampcardservice.mapper.Convertor;
import com.rampcard.rampcardservice.repository.RampcardStatusRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RampcardStatusServiceImpl implements RampcardStatusService {


    private final RampcardStatusRepository rampcardStatusRepository;

    @Autowired
    public RampcardStatusServiceImpl(RampcardStatusRepository rampcardStatusRepository, ModelMapper modelMapper) {
        this.rampcardStatusRepository = rampcardStatusRepository;
    }

    @Override
    public RampcardStatusDTO add(RampcardStatusDTO rampcardStatusDTO) {
        RampcardStatus rampcardStatus = rampcardStatusRepository
                .save(Convertor.convertToEntity(rampcardStatusDTO, RampcardStatus.class));
        return Convertor.convertToDTO(rampcardStatus, RampcardStatusDTO.class);
    }

    @Override
    public RampcardStatusDTO getById(Integer id) {
        Optional<RampcardStatus> rampcardStatus = rampcardStatusRepository.findById(id);
        return rampcardStatus.map(entity -> Convertor.convertToDTO(entity, RampcardStatusDTO.class)).orElse(null);
    }

    @Override
    public List<RampcardStatusDTO> getAll() {
        List<RampcardStatus> rampcardStatusList = rampcardStatusRepository.findAll();
        return rampcardStatusList.stream()
                .map(entity -> Convertor.convertToDTO(entity, RampcardStatusDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Integer id) {
        rampcardStatusRepository.deleteById(id);
    }

    @Override
    public void save(RampcardStatusDTO rampcardStatusDTO) {
        rampcardStatusRepository.save(Convertor.convertToEntity(rampcardStatusDTO, RampcardStatus.class));
    }

    @Override
    public RampcardStatusDTO updateById(Integer id, RampcardStatusDTO rampcardStatusDTO) {
        Optional<RampcardStatus> existingStatusOptional = rampcardStatusRepository.findById(id);

        existingStatusOptional.ifPresent(existingStatus -> {
            existingStatus.setTitle(rampcardStatusDTO.getTitle());
            existingStatus.setCount(rampcardStatusDTO.getCount());
            rampcardStatusRepository.save(existingStatus);
        });

        return existingStatusOptional.map(entity -> Convertor.convertToDTO(entity, RampcardStatusDTO.class)).orElse(null);
    }

    @Override
    public RampcardStatusDTO updatePartialById(Integer id, Map<String, Object> updates) {
        RampcardStatus existingStatus = rampcardStatusRepository.findById(id)
                .orElseThrow(() -> new RampcardStatusNotFoundException(id));

        applyPartialUpdates(existingStatus, updates);
        rampcardStatusRepository.save(existingStatus);
        return Convertor.convertToDTO(existingStatus, RampcardStatusDTO.class);
    }

    private void applyPartialUpdates(RampcardStatus existingStatus, Map<String, Object> updates) {
        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String field = entry.getKey();
            Object value = entry.getValue();

            if ("title".equals(field)) {
                existingStatus.setTitle((String) value);
            } else if ("count".equals(field)) {
                existingStatus.setCount((Integer) value);
            } else {
                throw new IllegalArgumentException("Unsupported field: " + field);
            }
        }
    }


}
