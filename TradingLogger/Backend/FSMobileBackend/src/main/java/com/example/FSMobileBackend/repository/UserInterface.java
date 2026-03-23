package com.example.FSMobileBackend.repository;

import com.example.FSMobileBackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserInterface extends MongoRepository<User, String> {
    User findUserByEmail(String email);
}
