package com.example.FSMobileBackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "logdb")
public class Log {

    @Id
    private String id;

    private String stockName;

    private double amount;

    private double pnl;

    private int leverage;

    private boolean positive;

    private String date;

    private String description;

    private String userId;

}
