package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

@ExtendWith(MockitoExtension.class)
class PaymentClientTest {

    @Mock
    private RestTemplate restTemplate;

    @Test
    void shouldFetchPaymentFromPaymentServiceEndpoint() {
        when(restTemplate.getForObject("http://task18-payment-service/payments", String.class))
            .thenReturn("Payment Service Working!");

        PaymentClient paymentClient = new PaymentClient(restTemplate);

        String result = paymentClient.getPayment();

        assertEquals("Payment Service Working!", result);
        verify(restTemplate).getForObject("http://task18-payment-service/payments", String.class);
    }
}
