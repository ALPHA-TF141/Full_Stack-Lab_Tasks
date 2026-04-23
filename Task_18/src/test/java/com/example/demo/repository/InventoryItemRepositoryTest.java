package com.example.demo.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.demo.model.InventoryItem;

@DataJpaTest
class InventoryItemRepositoryTest {

    @Autowired
    private InventoryItemRepository repository;

    @Test
    void shouldSaveAndFetchInventoryItem() {
        InventoryItem item = new InventoryItem(null, "Desk", 4, "Furniture");

        InventoryItem savedItem = repository.save(item);

        assertTrue(repository.findById(savedItem.getId()).isPresent());
        assertEquals("Desk", repository.findById(savedItem.getId()).orElseThrow().getProductName());
    }

    @Test
    void shouldFindItemsByCategoryIgnoringCase() {
        repository.save(new InventoryItem(null, "Headset", 11, "Electronics"));
        repository.save(new InventoryItem(null, "Charger", 16, "electronics"));
        repository.save(new InventoryItem(null, "File", 30, "Stationery"));

        List<InventoryItem> electronicsItems = repository.findByCategoryIgnoreCase("ELECTRONICS");

        assertEquals(2, electronicsItems.size());
    }
}
