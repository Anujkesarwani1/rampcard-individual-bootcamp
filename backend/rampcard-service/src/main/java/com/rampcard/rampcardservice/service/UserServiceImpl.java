package com.rampcard.rampcardservice.service;

import com.rampcard.rampcardservice.dto.UserDTO;
import com.rampcard.rampcardservice.entity.User;
import com.rampcard.rampcardservice.mapper.Convertor;
import com.rampcard.rampcardservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO add(UserDTO userDTO) {
        User newUser = userRepository.save(Convertor.convertToEntity(userDTO, User.class));
        return Convertor.convertToDTO(newUser, UserDTO.class);
    }

    @Override
    public UserDTO getById(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(entity -> Convertor.convertToDTO(entity, UserDTO.class)).orElse(null);
    }

    @Override
    public List<UserDTO> getAll() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(entity -> Convertor.convertToDTO(entity, UserDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public void deleteById(Integer userId) {
        userRepository.deleteById(userId);
    }


    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public UserDTO updateById(Integer userId, UserDTO userDTO) {
        Optional<User> existingUserOptional = userRepository.findById(userId);

        existingUserOptional.ifPresent(existingUser -> {
            existingUser.setName(userDTO.getName());
            existingUser.setVirtualName(userDTO.getVirtualName());
            userRepository.save(existingUser);
        });

        return existingUserOptional.map(entity -> Convertor.convertToDTO(entity, UserDTO.class)).orElse(null);
    }
}

