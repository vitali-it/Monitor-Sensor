package com.monitor.sensor.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.ui.Sensor;

@RestController
@CrossOrigin
@RequestMapping("api/v1/sensors")
@RequiredArgsConstructor
public class SensorController {

    private final SensorService service;

    @GetMapping
    public List<Sensor> receiveAll() {
        return service.getAll();
    }
}
