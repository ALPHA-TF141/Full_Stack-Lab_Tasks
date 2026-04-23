package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.InventoryItem;
import com.example.demo.repository.InventoryItemRepository;

@Service
public class InventoryService {

    private final InventoryItemRepository repository;

    public InventoryService(InventoryItemRepository repository) {
        this.repository = repository;
    }

    public List<InventoryItem> getAllItems() {
        return repository.findAll();
    }

    public InventoryItem getItemById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory item not found with id: " + id));
    }

    public List<InventoryItem> getItemsByCategory(String category) {
        return repository.findByCategoryIgnoreCase(category);
    }

    public InventoryItem createItem(InventoryItem item) {
        return repository.save(item);
    }

    public InventoryItem updateItemQuantity(Long id, int quantity) {
        InventoryItem existingItem = getItemById(id);
        existingItem.setQuantity(quantity);
        return repository.save(existingItem);
    }

    public void deleteItem(Long id) {
        InventoryItem existingItem = getItemById(id);
        repository.delete(existingItem);
    }
}
