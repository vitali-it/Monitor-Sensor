package com.monitor.sensor.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import com.monitor.sensor.dao.SensorUnitRepo;
import com.monitor.sensor.mapper.SensorUnitMapper;
import com.monitor.sensor.service.SensorUnitService;
import com.monitor.sensor.ui.SensorUnit;

@Service
@RequiredArgsConstructor
public class SensorUnitServiceImpl implements SensorUnitService {

    private final SensorUnitRepo repo;

    private final SensorUnitMapper mapper;

    @Override
    public List<SensorUnit> getAll() {
        return repo.findAll().stream().map(mapper::entityToDomain).collect(Collectors.toList());
    }

}
