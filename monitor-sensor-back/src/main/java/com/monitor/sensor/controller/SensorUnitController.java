package com.monitor.sensor.controller;

import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.monitor.sensor.service.SensorUnitService;
import com.monitor.sensor.ui.SensorUnit;

@RestController
@RequestMapping("api/v1/sensor_units")
@RequiredArgsConstructor
public class SensorUnitController {

    private final SensorUnitService service;

    @GetMapping
    public List<SensorUnit> receiveAll() {
        return service.getAll();
    }
}
