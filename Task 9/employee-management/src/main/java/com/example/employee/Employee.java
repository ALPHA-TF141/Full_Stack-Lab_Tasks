package com.example.employee;
public class Employee {
    private int id;
    private String name;
    private String department;
    public Employee(int id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }
    public void displayEmployee() {
        System.out.println("ID: " + id + " Name: " + name + " Department: " + department);
    }
}