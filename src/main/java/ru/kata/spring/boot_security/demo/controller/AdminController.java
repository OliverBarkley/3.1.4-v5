package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.roleService.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.ArrayList;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;




    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    //        @GetMapping("/new")
//    public String newUser(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("listRoles",roleService.getAllRoles());
//        return "new";
//    }
    @GetMapping()
    public String userList(Model model) {
        User user = new User();
        model.addAttribute("allUsers", userService.findAll());
        model.addAttribute("userMain", user);
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin";
    }


    @PostMapping(value = "/new")
    public String createUser(User user, @RequestParam("listRoles") ArrayList<Long> roles) {
        userService.save(user, user.getRoles());
        return "redirect:/admin";
    }
//
//    @GetMapping("/edit/{id}")
//    public String edit(Model model, @PathVariable("id") long id){
//        model.addAttribute("user", userService.findById(id));
//        model.addAttribute("listRoles", roleService.getAllRoles());
//        return "edit";
//    }

    @PostMapping("/edit")
    public String update(@ModelAttribute("user") User user, @RequestParam("listRoles") ArrayList<Long> roles) {
        userService.update(user, roleService.findRoles(roles));
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
