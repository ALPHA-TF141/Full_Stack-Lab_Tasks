package com.example.demo;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class PaymentClient {

    private final RestTemplate restTemplate;

    public PaymentClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getPayment() {
        return restTemplate.getForObject(
            "http://task18-payment-service/payments",
            String.class
        );
    }
}
