package com.example.employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component; 
@Component
public class EmployeeService {
    @Autowired
    private EmployeeRepository repository;
    public void createEmployee(int id, String name, String dept) {
        Employee emp = new Employee(id, name, dept);
        repository.addEmployee(emp);
    }
    public void showEmployees() {
        for (Employee e : repository.getAllEmployees()) {
            e.displayEmployee();
        }
    }
}