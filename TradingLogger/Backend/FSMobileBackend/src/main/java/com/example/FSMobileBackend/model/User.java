package com.example.FSMobileBackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "userdb")
public class User {

    @Id
    private String id;

    private String fName;

    private String lName;

    private String email;

    private String password;

}
