package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.RampcardStatusDTO;

import java.util.List;
import java.util.Map;

public interface RampcardStatusService {
    public RampcardStatusDTO add(RampcardStatusDTO rampcardStatusDTO);

    public RampcardStatusDTO getById(Integer id);

    public List<RampcardStatusDTO> getAll();

    public void deleteById(Integer id);

    public void save(RampcardStatusDTO rampcardStatusDTO);

    public RampcardStatusDTO updateById(Integer id, RampcardStatusDTO rampcardStatusDTO);

    public RampcardStatusDTO updatePartialById(Integer id, Map<String, Object> updates);
}
