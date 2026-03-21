package com.example.employee.model;

public class Employee {

    private int id;
    private String name;
    private String department;

    public Employee(int id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    public String toString() {
        return "Employee [id=" + id +
               ", name=" + name +
               ", department=" + department + "]";
    }
}