package com.monitor.sensor.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.monitor.sensor.service.UserService;
import com.monitor.sensor.ui.User;

@RestController
@CrossOrigin
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping
    public List<User> receiveAll() {
        return service.getAll();
    }
}
