package com.example.FSMobileBackend.services;

import com.example.FSMobileBackend.model.Log;
import com.example.FSMobileBackend.repository.TradeLoggerInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeLoggerServicesImp implements TradeLoggerServices {

    @Autowired
    private TradeLoggerInterface tradeLoggerInterface;

    @Override
    public List<Log> findAllByUserId(String userId) {
        return tradeLoggerInterface.findAllByUserId(userId);
    }
}
