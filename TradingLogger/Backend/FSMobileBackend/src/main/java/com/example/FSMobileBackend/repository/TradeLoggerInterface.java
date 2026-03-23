package com.example.FSMobileBackend.repository;

import com.example.FSMobileBackend.model.Log;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TradeLoggerInterface extends MongoRepository<Log, String> {
    List<Log> findAllByUserId(String userId);
}
