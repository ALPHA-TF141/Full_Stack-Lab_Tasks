package com.example.employee.main;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.example.employee.config.AppConfig;
import com.example.employee.service.EmployeeService;

public class EmployeeApp {

    public static void main(String[] args) {

        BeanFactory factory = new AnnotationConfigApplicationContext(AppConfig.class);

        EmployeeService service = factory.getBean(EmployeeService.class);

        service.createEmployee(101, "ABC", "IT");
        service.createEmployee(102, "XYZ", "HR");

        service.fetchAllEmployees().forEach(System.out::println);
    }
}