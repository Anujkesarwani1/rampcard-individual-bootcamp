package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.UserDTO;
import com.rampcard.rampcardservice.entity.User;
import com.rampcard.rampcardservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("Anuj Kesarwani");
        userDTO.setVirtualName("(Virtual 2009)");

        when(userRepository.save(any(User.class))).thenReturn(new User());

        userService.add(userDTO);

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testGetUserById() {
        int userId = 1;
        User user = new User();
        user.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.getById(userId);

        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testGetAllUser() {
        List<User> userList = new ArrayList<>();
        userList.add(new User());
        userList.add(new User());
        when(userRepository.findAll()).thenReturn(userList);

        userService.getAll();

        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testDeleteByUserId() {
        int userId = 1;

        userService.deleteById(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void testUpdateUser() {
        int userId = 1;
        UserDTO userDTO = new UserDTO();
        userDTO.setName("Anuj");
        userDTO.setVirtualName("(Virtual 2010)");

        User existingUser = new User();
        existingUser.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(existingUser);

        userService.updateById(userId, userDTO);

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testSaveUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("H&M");
        userDTO.setVirtualName("(Virtual 2007)");

        User userToSave = new User();
        userToSave.setName(userDTO.getName());
        userToSave.setVirtualName(userDTO.getVirtualName());

        when(userRepository.save(any(User.class))).thenReturn(userToSave);

        userService.save(userToSave);

        verify(userRepository, times(1)).save(userToSave);
    }
}
