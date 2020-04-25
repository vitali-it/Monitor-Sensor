package com.monitor.sensor.controller;

import lombok.RequiredArgsConstructor;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public SensorUnit receiveById(@PathVariable final Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<SensorUnit> createOne(@Valid @RequestBody final SensorUnit sensorUnit) {
        return new ResponseEntity<>(service.addOne(sensorUnit), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SensorUnit> updateOne(@Valid @RequestBody final SensorUnit sensorUnit,
            @PathVariable final Integer id) {
        return ResponseEntity.ok(service.modifyOne(sensorUnit, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable final Integer id) {
        service.removeOne(id);
        return ResponseEntity.ok(id);
    }
}
