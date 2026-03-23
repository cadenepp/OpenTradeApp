package com.example.FSMobileBackend.services;

import com.example.FSMobileBackend.model.User;
import com.example.FSMobileBackend.repository.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServicesImp implements UserServices {

    @Autowired
    private UserInterface userInterface;

    @Override
    public User findUserByEmail(String email) {
        return userInterface.findUserByEmail(email);
    }
}
