package com.rampcard.rampcardservice.controller;
import com.rampcard.rampcardservice.dto.RampcardStatusDTO;
import com.rampcard.rampcardservice.exception.RampcardStatusNotFoundException;
import com.rampcard.rampcardservice.service.RampcardStatusService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class RampcardStatusControllerTest {

    @Mock
    private RampcardStatusService rampcardStatusService;

    @InjectMocks
    private RampcardStatusController rampcardStatusController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllRampcardStatus() {
        List<RampcardStatusDTO> rampcardStatusDTOList = new ArrayList<>();
        rampcardStatusDTOList.add(new RampcardStatusDTO());
        rampcardStatusDTOList.add(new RampcardStatusDTO());

        when(rampcardStatusService.getAll()).thenReturn(rampcardStatusDTOList);

        ResponseEntity<List<RampcardStatusDTO>> responseEntity = rampcardStatusController.getAll();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, Objects.requireNonNull(responseEntity.getBody()).size());
    }

    @Test
    void testGetRampcardStatusById() {
        int id = 1;
        RampcardStatusDTO rampcardStatusDTO = new RampcardStatusDTO();
        when(rampcardStatusService.getById(id)).thenReturn(rampcardStatusDTO);

        ResponseEntity<RampcardStatusDTO> responseEntity = rampcardStatusController.getById(id);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(rampcardStatusDTO, responseEntity.getBody());
    }

    @Test
    void testGetRampcardStatusByIdNotFound() {
        int id = 1;
        when(rampcardStatusService.getById(id)).thenReturn(null);

        ResponseEntity<RampcardStatusDTO> responseEntity = rampcardStatusController.getById(id);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testCreateRampcardStatus() {
        RampcardStatusDTO rampcardStatusDTO = new RampcardStatusDTO();
        when(rampcardStatusService.add(rampcardStatusDTO)).thenReturn(rampcardStatusDTO);

        ResponseEntity<RampcardStatusDTO> responseEntity = rampcardStatusController.add(rampcardStatusDTO);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(rampcardStatusDTO, responseEntity.getBody());
    }

    @Test
    void testUpdatePartialRampcardStatus() {
        int id = 1;
        Map<String, Object> updates = new HashMap<>();
        updates.put("status", "updated");

        RampcardStatusDTO updatedStatusDTO = new RampcardStatusDTO();
        when(rampcardStatusService.updatePartialById(id, updates)).thenReturn(updatedStatusDTO);

        ResponseEntity<RampcardStatusDTO> responseEntity = rampcardStatusController.updatePartialById(id, updates);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(updatedStatusDTO, responseEntity.getBody());
    }

    @Test
    void testUpdatePartialRampcardStatusNotFound() {
        int id = 1;
        Map<String, Object> updates = new HashMap<>();
        updates.put("status", "updated");

        when(rampcardStatusService.updatePartialById(id, updates)).thenReturn(null);

        RampcardStatusNotFoundException exception = assertThrows(RampcardStatusNotFoundException.class,
                () -> rampcardStatusController.updatePartialById(id, updates));

        assertEquals("Brand not found with ID: " + id, exception.getMessage());
    }

    @Test
    void testDeleteRampcardStatus() {
        int id = 1;
        RampcardStatusDTO rampcardStatusDTO = new RampcardStatusDTO();
        when(rampcardStatusService.getById(id)).thenReturn(rampcardStatusDTO);

        String response = rampcardStatusController.deleteById(id);

        assertEquals("Deleted Rampcard Status id - " + id, response);
        verify(rampcardStatusService, times(1)).deleteById(id);
    }

    @Test
    void testDeleteRampcardStatusNotFound() {
        int id = 1;
        when(rampcardStatusService.getById(id)).thenReturn(null);

        RampcardStatusNotFoundException exception = assertThrows(RampcardStatusNotFoundException.class,
                () -> rampcardStatusController.deleteById(id));

        assertEquals("Brand not found with ID: " + id, exception.getMessage());
        verify(rampcardStatusService, times(0)).deleteById(anyInt());
    }
}
