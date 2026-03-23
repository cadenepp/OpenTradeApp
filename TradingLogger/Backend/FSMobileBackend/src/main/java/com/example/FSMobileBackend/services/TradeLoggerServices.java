package com.example.FSMobileBackend.services;

import com.example.FSMobileBackend.model.Log;
import java.util.List;

public interface TradeLoggerServices {
    List<Log> findAllByUserId(String userId);
}
