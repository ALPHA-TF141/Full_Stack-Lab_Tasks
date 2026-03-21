package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @GetMapping("/users/{id}")
    public String getUserById(@PathVariable int id) {

        if (id != 1) {
            throw new ResourceNotFoundException("User with ID " + id + " not found");
        }

        return "User Found: ID = " + id;
    }
}