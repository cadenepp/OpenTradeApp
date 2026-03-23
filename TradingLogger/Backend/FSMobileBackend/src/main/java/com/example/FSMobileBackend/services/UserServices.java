package com.example.FSMobileBackend.services;

import com.example.FSMobileBackend.model.User;

public interface UserServices {
    User findUserByEmail(String email);
}
