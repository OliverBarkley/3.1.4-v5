package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    List<User> findAll();

    User findById(long id);

    User findByUserName(String name);

    void save(User user, Set<Role> roles);

    void update(User user, Set<Role> roles);

    void delete(long id);
}
