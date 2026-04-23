package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.InventoryItem;
import com.example.demo.repository.InventoryItemRepository;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private InventoryItemRepository repository;

    @InjectMocks
    private InventoryService inventoryService;

    @Test
    void shouldReturnAllItems() {
        List<InventoryItem> expectedItems = List.of(
                new InventoryItem(1L, "Keyboard", 10, "Electronics"),
                new InventoryItem(2L, "Notebook", 25, "Stationery"));
        when(repository.findAll()).thenReturn(expectedItems);

        List<InventoryItem> actualItems = inventoryService.getAllItems();

        assertEquals(2, actualItems.size());
        assertSame(expectedItems, actualItems);
        verify(repository).findAll();
    }

    @Test
    void shouldUpdateQuantityWhenItemExists() {
        InventoryItem existingItem = new InventoryItem(1L, "Mouse", 8, "Electronics");
        when(repository.findById(1L)).thenReturn(Optional.of(existingItem));
        when(repository.save(existingItem)).thenReturn(existingItem);

        InventoryItem updatedItem = inventoryService.updateItemQuantity(1L, 15);

        assertEquals(15, updatedItem.getQuantity());
        verify(repository).findById(1L);
        verify(repository).save(existingItem);
    }

    @Test
    void shouldThrowExceptionWhenUpdatingMissingItem() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> inventoryService.updateItemQuantity(99L, 5));

        assertEquals("Inventory item not found with id: 99", exception.getMessage());
        verify(repository).findById(99L);
        verify(repository, never()).save(org.mockito.ArgumentMatchers.any());
    }

    @Test
    void shouldDeleteItemWhenPresent() {
        InventoryItem item = new InventoryItem(4L, "Chair", 6, "Furniture");
        when(repository.findById(4L)).thenReturn(Optional.of(item));

        inventoryService.deleteItem(4L);

        verify(repository).delete(item);
    }
}
