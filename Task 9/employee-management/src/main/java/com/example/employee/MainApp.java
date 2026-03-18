package com.example.employee;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MainApp {
    
	public static void main(String[] args) {
        
    	BeanFactory factory =
                new AnnotationConfigApplicationContext(AppConfig.class);
        
        EmployeeService service = factory.getBean(EmployeeService.class); 

		service.createEmployee(1, "Rahul", "IT");
		service.createEmployee(2, "Aman", "HR");
		
		service.showEmployees();
		
	}
}