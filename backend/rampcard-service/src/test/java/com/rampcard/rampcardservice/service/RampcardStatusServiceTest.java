package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.RampcardStatusDTO;
import com.rampcard.rampcardservice.entity.RampcardStatus;
import com.rampcard.rampcardservice.repository.RampcardStatusRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
 class RampcardStatusServiceTest {

    private RampcardStatusService rampcardStatusService;

    @Mock
    private RampcardStatusRepository rampcardStatusRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ModelMapper modelMapper = new ModelMapper();
        rampcardStatusService = new RampcardStatusServiceImpl(rampcardStatusRepository, modelMapper);
    }

    @Test
    void testGetRampcardStatusById() {
        int id = 1;
        RampcardStatus rampcardStatus = new RampcardStatus(1, "Test Title", 10);

        when(rampcardStatusRepository.findById(id)).thenReturn(Optional.of(rampcardStatus));

        RampcardStatusDTO rampcardStatusDTO = rampcardStatusService.getById(id);

        assertEquals(rampcardStatus.getId(), rampcardStatusDTO.getId());
        assertEquals(rampcardStatus.getTitle(), rampcardStatusDTO.getTitle());
        assertEquals(rampcardStatus.getCount(), rampcardStatusDTO.getCount());

        verify(rampcardStatusRepository, times(1)).findById(id);
    }

    @Test
    void testGetAllRampcardStatus() {
        List<RampcardStatus> rampcardStatusList = new ArrayList<>();
        rampcardStatusList.add(new RampcardStatus(1, "Status 1", 5));
        rampcardStatusList.add(new RampcardStatus(2, "Status 2", 8));

        when(rampcardStatusRepository.findAll()).thenReturn(rampcardStatusList);

        List<RampcardStatusDTO> rampcardStatusDTOList = rampcardStatusService.getAll();

        assertEquals(rampcardStatusList.size(), rampcardStatusDTOList.size());

        verify(rampcardStatusRepository, times(1)).findAll();
    }

    @Test
    void testAddRampcardStatus() {
        RampcardStatusDTO rampcardStatusDTO = new RampcardStatusDTO();
        rampcardStatusDTO.setTitle("New Status");
        rampcardStatusDTO.setCount(10);

        RampcardStatus savedRampcardStatus = new RampcardStatus(1, "New Status", 10);

        when(rampcardStatusRepository.save(any())).thenReturn(savedRampcardStatus);

        RampcardStatusDTO createdStatus = rampcardStatusService.add(rampcardStatusDTO);

        assertEquals(savedRampcardStatus.getId(), createdStatus.getId());
        assertEquals(savedRampcardStatus.getTitle(), createdStatus.getTitle());
        assertEquals(savedRampcardStatus.getCount(), createdStatus.getCount());

        verify(rampcardStatusRepository, times(1)).save(any());
    }

    @Test
    void testUpdateRampcardStatus() {
        int id = 1;
        RampcardStatusDTO updatedDTO = new RampcardStatusDTO();
        updatedDTO.setTitle("Updated Status");
        updatedDTO.setCount(20);

        RampcardStatus existingStatus = new RampcardStatus(id, "Old Status", 15);
        when(rampcardStatusRepository.findById(id)).thenReturn(Optional.of(existingStatus));
        when(rampcardStatusRepository.save(any())).thenReturn(existingStatus);

        RampcardStatusDTO updatedStatus = rampcardStatusService.updateById(id, updatedDTO);

        assertEquals(existingStatus.getId(), updatedStatus.getId());
        assertEquals(updatedDTO.getTitle(), updatedStatus.getTitle());
        assertEquals(updatedDTO.getCount(), updatedStatus.getCount());

        verify(rampcardStatusRepository, times(1)).findById(id);
        verify(rampcardStatusRepository, times(1)).save(any());
    }

    @Test
    void testDeleteRampcardStatusById() {
        int id = 1;
        RampcardStatus existingStatus = new RampcardStatus(id, "Existing Status", 5);

        when(rampcardStatusRepository.findById(id)).thenReturn(Optional.of(existingStatus));

        rampcardStatusService.deleteById(id);

        verify(rampcardStatusRepository, times(1)).deleteById(id);
    }

     @Test
     void testUpdatePartialRampcardStatus() {
         int id = 1;
         Map<String, Object> updates = Map.of("title", "Updated Title", "count", 30);
         RampcardStatus existingStatus = new RampcardStatus(id, "Existing Status", 15);

         when(rampcardStatusRepository.findById(id)).thenReturn(Optional.of(existingStatus));
         when(rampcardStatusRepository.save(any())).thenReturn(existingStatus);

         RampcardStatusDTO updatedStatus = rampcardStatusService.updatePartialById(id, updates);

         assertEquals(existingStatus.getId(), updatedStatus.getId());
         assertEquals(updates.get("title"), updatedStatus.getTitle());
         assertEquals(updates.get("count"), updatedStatus.getCount());

         verify(rampcardStatusRepository, times(1)).findById(id);
         verify(rampcardStatusRepository, times(1)).save(any());
     }

     @Test
     void testUpdatePartialRampcardStatusWithUnsupportedField() {
         int id = 1;
         Map<String, Object> updates = Map.of("name", "Anuj");

         RampcardStatus existingStatus = new RampcardStatus(id, "Existing Status", 15);
         when(rampcardStatusRepository.findById(id)).thenReturn(Optional.of(existingStatus));

         assertThrows(IllegalArgumentException.class,
                 () -> rampcardStatusService.updatePartialById(id, updates));

         verify(rampcardStatusRepository, times(1)).findById(id);
         verify(rampcardStatusRepository, times(0)).save(any());
     }

     @Test
     void testSaveRampcardStatusDTO() {
         RampcardStatusDTO rampcardStatusDTO = new RampcardStatusDTO();
         rampcardStatusDTO.setTitle("Category rules");
         rampcardStatusDTO.setCount(10);

         RampcardStatus rampcardStatusEntity = new RampcardStatus();
         rampcardStatusEntity.setId(1);
         rampcardStatusEntity.setTitle("Category rules");
         rampcardStatusEntity.setCount(10);

         when(rampcardStatusRepository.save(any())).thenReturn(rampcardStatusEntity);

         rampcardStatusService.save(rampcardStatusDTO);

         verify(rampcardStatusRepository, times(1)).save(any());
     }
}
