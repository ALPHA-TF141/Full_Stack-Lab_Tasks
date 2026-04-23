package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.InventoryItem;
import com.example.demo.service.InventoryService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api/inventory")
@Validated
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public List<InventoryItem> getItems(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            return inventoryService.getItemsByCategory(category);
        }
        return inventoryService.getAllItems();
    }

    @GetMapping("/{id}")
    public InventoryItem getItemById(@PathVariable Long id) {
        return inventoryService.getItemById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryItem createItem(@Valid @RequestBody InventoryItem item) {
        return inventoryService.createItem(item);
    }

    @PatchMapping("/{id}/quantity")
    public InventoryItem updateQuantity(@PathVariable Long id, @RequestParam @Min(0) int quantity) {
        return inventoryService.updateItemQuantity(id, quantity);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable Long id) {
        inventoryService.deleteItem(id);
    }
}
