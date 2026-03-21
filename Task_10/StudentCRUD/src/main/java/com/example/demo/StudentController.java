package com.example.demo;
import java.util.List;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService service;
    public StudentController(StudentService service) {
        this.service = service;
    }
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id) {
        return service.getStudentById(id);
    }
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable int id,@RequestBody Student student) {
        student.setId(id);
        return service.updateStudent(student);
    }
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        service.deleteStudent(id);
        return "Student deleted successfully";
    }
}