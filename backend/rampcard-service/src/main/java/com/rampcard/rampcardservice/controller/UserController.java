package com.rampcard.rampcardservice.controller;


import com.rampcard.rampcardservice.dto.UserDTO;
import com.rampcard.rampcardservice.exception.UserNotFoundException;
import com.rampcard.rampcardservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {
   private final UserService userService;

   @Autowired
   public UserController(UserService userService) {
       this.userService = userService;
   }

   @GetMapping("/")
   public ResponseEntity<List<UserDTO>> getAll() {
       List<UserDTO> users = userService.getAll();
       return ResponseEntity.ok(users);
   }

   @PostMapping("/")
   public ResponseEntity<UserDTO> add(@RequestBody UserDTO userDTO) {
       UserDTO createdUser = userService.add(userDTO);
       return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
   }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Integer id) {
        UserDTO user = userService.getById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateById(@PathVariable Integer id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateById(id, userDTO);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) {
        UserDTO userDTO = userService.getById(id);

        if (userDTO == null) {
            throw new UserNotFoundException(id);
        }

        userService.deleteById(id);
        return ResponseEntity.ok("Deleted user with ID: " + id);
    }
}
