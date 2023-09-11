package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.UserDTO;
import com.rampcard.rampcardservice.entity.User;

import java.util.List;

public interface UserService {
    public UserDTO add(UserDTO userDTO);

    public UserDTO getById(Integer id);

    public List<UserDTO> getAll();

    public void deleteById(Integer userId);

    public void save(User user);

    public UserDTO updateById(Integer id, UserDTO userDTO);
}

