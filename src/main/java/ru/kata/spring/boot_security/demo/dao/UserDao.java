package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public interface UserDao {
    void save(User user);
    void delete(long id);
    void update(User user, Set<Role> roles);
    List<User> findAll();
    User findById(long id);
    User findByUserName(String name);
}
