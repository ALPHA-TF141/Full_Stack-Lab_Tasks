package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // GET
    @GetMapping
    public List<Product> getAll() {
        return service.getAll();
    }

    // POST
    @PostMapping
    public String add(@RequestBody Product p) {
        return service.add(p);
    }

    // PUT
    @PutMapping("/{id}")
    public String update(@PathVariable int id, @RequestBody Product p) {
        System.out.println("ID: " + id);
        System.out.println("Name: " + p.getName());
        System.out.println("Price: " + p.getPrice());
        return service.update(id, p);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        return service.delete(id);
    }
}