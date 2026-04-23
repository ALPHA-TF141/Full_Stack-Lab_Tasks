package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private UserClient userClient;

    @Mock
    private PaymentClient paymentClient;

    @InjectMocks
    private OrderService orderService;

    @Test
    void shouldComposeOrderSummaryFromUserServiceResponse() {
        when(userClient.getUsers()).thenReturn("User Service Working");

        String result = orderService.createOrderSummary();

        assertEquals("Order Created | User Service Working", result);
        verify(userClient).getUsers();
    }

    @Test
    void shouldReturnPaymentStatusFromPaymentClient() {
        when(paymentClient.getPayment()).thenReturn("Payment Service Working!");

        String result = orderService.getPaymentStatus();

        assertEquals("Payment Service Working!", result);
        verify(paymentClient).getPayment();
    }
}
