package com.example.demo.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.InventoryItem;
import com.example.demo.service.InventoryService;

@WebMvcTest(InventoryController.class)
class InventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InventoryService inventoryService;

    @Test
    void shouldReturnAllInventoryItems() throws Exception {
        when(inventoryService.getAllItems()).thenReturn(
                List.of(
                        new InventoryItem(1L, "Laptop", 5, "Electronics"),
                        new InventoryItem(2L, "Pen", 100, "Stationery")));

        mockMvc.perform(get("/api/inventory"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productName").value("Laptop"))
                .andExpect(jsonPath("$[1].category").value("Stationery"));
    }

    @Test
    void shouldCreateInventoryItem() throws Exception {
        InventoryItem savedItem = new InventoryItem(3L, "Table", 7, "Furniture");
        when(inventoryService.createItem(any(InventoryItem.class))).thenReturn(savedItem);

        mockMvc.perform(post("/api/inventory")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "productName": "Table",
                                  "quantity": 7,
                                  "category": "Furniture"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.productName").value("Table"));
    }

    @Test
    void shouldRejectInvalidInventoryItem() throws Exception {
        mockMvc.perform(post("/api/inventory")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "productName": "",
                                  "quantity": -3,
                                  "category": ""
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.productName").value("Product name is required"))
                .andExpect(jsonPath("$.errors.quantity").value("Quantity cannot be negative"))
                .andExpect(jsonPath("$.errors.category").value("Category is required"));
    }

    @Test
    void shouldUpdateQuantity() throws Exception {
        when(inventoryService.updateItemQuantity(1L, 20))
                .thenReturn(new InventoryItem(1L, "Monitor", 20, "Electronics"));

        mockMvc.perform(patch("/api/inventory/1/quantity").param("quantity", "20"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(20));
    }

    @Test
    void shouldReturnNotFoundForMissingItem() throws Exception {
        when(inventoryService.getItemById(50L))
                .thenThrow(new ResourceNotFoundException("Inventory item not found with id: 50"));

        mockMvc.perform(get("/api/inventory/50"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Inventory item not found with id: 50"));
    }

    @Test
    void shouldDeleteItem() throws Exception {
        mockMvc.perform(delete("/api/inventory/10"))
                .andExpect(status().isNoContent());

        verify(inventoryService).deleteItem(10L);
    }
}
