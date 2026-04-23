package com.example.demo;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
class OrderControllerTest {

    @Mock
    private OrderService orderService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new OrderController(orderService)).build();
    }

    @Test
    void shouldReturnOrderSummary() throws Exception {
        when(orderService.createOrderSummary()).thenReturn("Order Created | User Service Working");

        mockMvc.perform(get("/orders"))
            .andExpect(status().isOk())
            .andExpect(content().string("Order Created | User Service Working"));

        verify(orderService).createOrderSummary();
    }

    @Test
    void shouldReturnPaymentStatus() throws Exception {
        when(orderService.getPaymentStatus()).thenReturn("Payment Service Working!");

        mockMvc.perform(get("/orders/payment"))
            .andExpect(status().isOk())
            .andExpect(content().string("Payment Service Working!"));

        verify(orderService).getPaymentStatus();
    }
}
