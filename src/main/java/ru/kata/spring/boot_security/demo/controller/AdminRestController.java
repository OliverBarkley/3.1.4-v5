package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.List;

@RestController
@RequestMapping("api/admin")
public class AdminRestController {

    private final UserService userService;

    @Autowired

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> userList(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User showUser(@PathVariable long id) {
        return userService.findById(id);
    }

    @PostMapping()
    public List<User> addUser(@RequestBody User user){
        userService.save(user, user.getRoles());
        return userService.findAll();
    }

    @PutMapping()
    public User update(@RequestBody User user){
        userService.update(user, user.getRoles());
        return user;
    }

    @DeleteMapping("/{id}")
    public List<User> deleteUser(@PathVariable long id) {
        userService.delete(id);
        return userService.findAll();
    }

}
