package com.example.demo.controller;

import com.example.demo.model.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @PostMapping("/register")
    public String registerUser(@Valid @RequestBody User user) {
        return "User registered successfully!";
    }
}