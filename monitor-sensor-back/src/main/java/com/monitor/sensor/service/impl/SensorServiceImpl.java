package com.monitor.sensor.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.monitor.sensor.dao.SensorRepo;
import com.monitor.sensor.mapper.SensorMapper;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.ui.Sensor;

@Service
@RequiredArgsConstructor
public class SensorServiceImpl implements SensorService {

    private final SensorRepo repo;

    private final SensorMapper mapper;

    @Override
    public List<Sensor> getAll() {
        return repo.findAll().stream().map(mapper::entityToDomain).collect(Collectors.toList());
    }
}
