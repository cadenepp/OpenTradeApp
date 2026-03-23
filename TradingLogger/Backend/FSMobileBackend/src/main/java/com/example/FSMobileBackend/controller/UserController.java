package com.example.FSMobileBackend.controller;

import com.example.FSMobileBackend.model.User;
import com.example.FSMobileBackend.model.UserDTO;
import com.example.FSMobileBackend.repository.UserInterface;
import com.example.FSMobileBackend.services.UserServicesImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserInterface userInterface;

    @Autowired
    private UserServicesImp userServicesImp;

    // Read by id
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable String id) {
        return userInterface.findById(id).orElse(null);
    }

    // Create User
    @PostMapping("/user")
    public String createUser(@RequestBody User user) {
        User newUser = userInterface.save(user);
        return newUser.getId();
    }

    // Update User
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User user) {
        user.setId(id);
        userInterface.save(user);
        return ResponseEntity.ok().build();
    }

    // Delete User
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        Optional<User> user = userInterface.findById(id);
        if (user.isPresent()) {
            userInterface.delete(user.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Login
    @PostMapping("/user/login")
    public ResponseEntity<User> loginUser(@RequestBody UserDTO userDTO) {
        String email = userDTO.getEmail();

        User user = userServicesImp.findUserByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        String userPass = user.getPassword();
        String userDTOPass = userDTO.getPassword();

        if (userDTOPass.equals(userPass)) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
