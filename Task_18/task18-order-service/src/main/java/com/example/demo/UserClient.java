package com.example.demo;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UserClient {

    private final RestTemplate restTemplate;

    public UserClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getUsers() {
        return restTemplate.getForObject(
            "http://task18-identity-service/users",
            String.class
        );
    }
}
