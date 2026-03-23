package com.example.FSMobileBackend.controller;

import com.example.FSMobileBackend.model.Log;
import com.example.FSMobileBackend.repository.TradeLoggerInterface;
import com.example.FSMobileBackend.services.TradeLoggerServices;
import com.example.FSMobileBackend.services.TradeLoggerServicesImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TradeLoggerController {

    @Autowired
    private TradeLoggerInterface tradeLoggerInterface;

    @Autowired
    private TradeLoggerServicesImp tradeLoggerServicesImp;

    // Read All
    @GetMapping("/trades/all/{userId}")
    public List<Log> getAllTrades(@PathVariable String userId) {
        return tradeLoggerServicesImp.findAllByUserId(userId);
    }

    // Read by Id
    @GetMapping("/trades/{id}")
    public Log getTradeById(@PathVariable String id) {
        return tradeLoggerInterface.findById(id).orElse(null);
    }

    // Create
    @PostMapping("/trades")
    public void createTrade(@RequestBody Log log) {
        tradeLoggerInterface.save(log);
    }

    // Update
    @PutMapping("/trades/{id}")
    public void updateTrade(@PathVariable String id, @RequestBody Log log) {
        log.setId(id);
        tradeLoggerInterface.save(log);
    }

    // Delete
    @DeleteMapping("/trades/{id}")
    public ResponseEntity<?> deleteTrade(@PathVariable String id) {
        Optional<Log> log = tradeLoggerInterface.findById(id);
        if (log.isPresent()) {
            tradeLoggerInterface.delete(log.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
