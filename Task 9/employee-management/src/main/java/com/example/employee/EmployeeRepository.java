package com.example.employee;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
@Component
public class EmployeeRepository {
    private List<Employee> employees = new ArrayList<>();
    public void addEmployee(Employee emp) {
        employees.add(emp);
    }
    public List<Employee> getAllEmployees() {
        return employees;
    }
}