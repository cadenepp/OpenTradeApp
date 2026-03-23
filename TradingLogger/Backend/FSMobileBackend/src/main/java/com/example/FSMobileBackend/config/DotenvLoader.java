package com.example.FSMobileBackend.config;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class DotenvLoader {

    // I had AI make this because technology tools are stupid and cant load .env files before run
    public static void load() {
        try {
            File file = new File(".env");
            if (!file.exists()) {
                System.out.println(".env file not found — skipping dotenv load");
                return;
            }

            try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                reader.lines()
                        .filter(line -> !line.isBlank())
                        .filter(line -> !line.startsWith("#"))
                        .forEach(line -> {
                            String[] parts = line.split("=", 2);
                            if (parts.length == 2) {
                                String key = parts[0].trim();
                                String value = parts[1].trim();
                                System.setProperty(key, value);
                            }
                        });
            }

            System.out.println(".env loaded into System properties");

        } catch (Exception e) {
            System.out.println("Failed to load .env: " + e.getMessage());
        }
    }
}

