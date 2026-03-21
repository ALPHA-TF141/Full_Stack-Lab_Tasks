package com.example.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;

@Component
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void createEmployee(int id, String name, String department) {
        Employee emp = new Employee(id, name, department);
        employeeRepository.addEmployee(emp);
    }

    public List<Employee> fetchAllEmployees() {
        return employeeRepository.getAllEmployees();
    }
}