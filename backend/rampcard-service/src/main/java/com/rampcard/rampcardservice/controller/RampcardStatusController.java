package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.RampcardStatusDTO;
import com.rampcard.rampcardservice.exception.RampcardStatusNotFoundException;
import com.rampcard.rampcardservice.service.RampcardStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("rampcard-status")
public class RampcardStatusController {
    @Autowired
    private RampcardStatusService rampcardStatusService;

    @GetMapping("/")
    public ResponseEntity<List<RampcardStatusDTO>> getAll() {
        List<RampcardStatusDTO> rampcardStatusDTOList = rampcardStatusService.getAll();
        return ResponseEntity.ok(rampcardStatusDTOList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RampcardStatusDTO> getById(@PathVariable Integer id) {
        RampcardStatusDTO rampcardStatusDTO = rampcardStatusService.getById(id);
        if(rampcardStatusDTO != null) {
            return ResponseEntity.ok(rampcardStatusDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/")
    public ResponseEntity<RampcardStatusDTO> add(@RequestBody RampcardStatusDTO rampcardStatusDTO) {
        RampcardStatusDTO rampcardStatusDTO1 = rampcardStatusService.add(rampcardStatusDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(rampcardStatusDTO1);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RampcardStatusDTO> updatePartialById(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> updates) {
        RampcardStatusDTO updatedStatusDTO = rampcardStatusService.updatePartialById(id, updates);

        if (updatedStatusDTO == null) {
            throw new RampcardStatusNotFoundException(id);
        }
        return ResponseEntity.ok(updatedStatusDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Integer id) {
        RampcardStatusDTO rampcardStatusDTO = rampcardStatusService.getById(id);

        if(rampcardStatusDTO == null) {
            throw new RampcardStatusNotFoundException(id);
        }

        rampcardStatusService.deleteById(id);
        return "Deleted Rampcard Status id - " + id;
    }
}
