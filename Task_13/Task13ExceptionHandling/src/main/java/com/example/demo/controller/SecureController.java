package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class SecureController {

    @GetMapping("/secure")
    public String secureEndpoint() {
        return "You have accessed a secure endpoint!";
    }
}