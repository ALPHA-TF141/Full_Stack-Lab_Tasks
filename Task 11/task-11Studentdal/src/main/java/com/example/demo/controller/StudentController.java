package com.example.demo.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;
@RestController
@RequestMapping("/students")
public class StudentController {  
    @Autowired
    StudentService service;
    @PostMapping
    public Student addStudent(@RequestBody Student student){
        return service.saveStudent(student);
    }
    @GetMapping
    public List<Student> getAllStudents(){
        return service.getAllStudents();
    }
    @GetMapping("/department/{dept}")
    public List<Student> getByDepartment(@PathVariable String dept){
        return service.getStudentsByDepartment(dept);
    }
    @GetMapping("/age/{age}")
    public List<Student> getByAge(@PathVariable int age){
        return service.getStudentsByAge(age);
    }
}