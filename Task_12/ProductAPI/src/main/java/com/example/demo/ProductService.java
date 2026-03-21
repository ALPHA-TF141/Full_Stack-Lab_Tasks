package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProductService {

    private List<Product> products = new ArrayList<>();

    public List<Product> getAll() {
        return products;
    }

    public String add(Product p) {
        products.add(p);
        return "Product Added";
    }

    public String update(int id, Product p) {
        for (Product prod : products) {
            if (prod.getId() == id) {
                prod.setName(p.getName());
                prod.setPrice(p.getPrice());
                return "Product Updated";
            }
        }
        return "Product Not Found";
    }

    public String delete(int id) {
        boolean removed = products.removeIf(p -> p.getId() == id);
        return removed ? "Product Deleted" : "Product Not Found";
    }
}