package com.example.demo;

import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final UserClient userClient;
    private final PaymentClient paymentClient;

    public OrderService(UserClient userClient, PaymentClient paymentClient) {
        this.userClient = userClient;
        this.paymentClient = paymentClient;
    }

    public String createOrderSummary() {
        return "Order Created | " + userClient.getUsers();
    }

    public String getPaymentStatus() {
        return paymentClient.getPayment();
    }
}
