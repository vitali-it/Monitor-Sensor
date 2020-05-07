package com.monitor.sensor.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.monitor.sensor.dao.UserRepo;
import com.monitor.sensor.mapper.UserMapper;
import com.monitor.sensor.service.UserService;
import com.monitor.sensor.ui.User;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo repo;

    private final UserMapper mapper;

    @Override
    public List<User> getAll() {
        return repo.findAll().stream().map(mapper::entityToDomain).collect(Collectors.toList());
    }
}
