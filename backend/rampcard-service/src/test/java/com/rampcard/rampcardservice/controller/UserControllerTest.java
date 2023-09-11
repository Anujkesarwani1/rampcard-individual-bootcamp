package com.rampcard.rampcardservice.controller;

import com.rampcard.rampcardservice.dto.UserDTO;
import com.rampcard.rampcardservice.exception.UserNotFoundException;
import com.rampcard.rampcardservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        List<UserDTO> userDTOList = new ArrayList<>();
        userDTOList.add(new UserDTO());
        userDTOList.add(new UserDTO());

        when(userService.getAll()).thenReturn(userDTOList);

        ResponseEntity<List<UserDTO>> responseEntity = userController.getAll();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, Objects.requireNonNull(responseEntity.getBody()).size());
    }

    @Test
    void testGetUserById() {
        int userId = 1;
        UserDTO userDTO = new UserDTO();
        when(userService.getById(userId)).thenReturn(userDTO);

        ResponseEntity<UserDTO> responseEntity = userController.getById(userId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userDTO, responseEntity.getBody());
    }

    @Test
    void testGetUserByIdNotFound() {
        int userId = 1;
        when(userService.getById(userId)).thenReturn(null);

        ResponseEntity<UserDTO> responseEntity = userController.getById(userId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testCreateUser() {
        UserDTO userDTO = new UserDTO();
        when(userService.add(userDTO)).thenReturn(userDTO);

        ResponseEntity<UserDTO> responseEntity = userController.add(userDTO);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(userDTO, responseEntity.getBody());
    }

    @Test
    void testUpdateUser() {
        int userId = 1;
        UserDTO userDTO = new UserDTO();
        when(userService.updateById(userId, userDTO)).thenReturn(userDTO);

        ResponseEntity<UserDTO> responseEntity = userController.updateById(userId, userDTO);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userDTO, responseEntity.getBody());
    }

    @Test
    void testUpdateUserNotFound() {
        int userId = 1;
        UserDTO userDTO = new UserDTO();
        when(userService.updateById(userId, userDTO)).thenReturn(null);

        ResponseEntity<UserDTO> responseEntity = userController.updateById(userId, userDTO);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testDeleteUser() {
        int userId = 1;
        UserDTO userDTO = new UserDTO();
        when(userService.getById(userId)).thenReturn(userDTO);

        ResponseEntity<String> responseEntity = userController.deleteById(userId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Deleted user with ID: " + userId, responseEntity.getBody());
        verify(userService, times(1)).deleteById(userId);
    }

    @Test
    void testDeleteUserNotFound() {
        int userId = 1;
        when(userService.getById(userId)).thenReturn(null);

        assertThrows(UserNotFoundException.class, () -> userController.deleteById(userId));
        verify(userService, times(0)).deleteById(anyInt());
    }
}
