package com.monitor.sensor.controller;

import java.util.List;
import javax.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.ui.Sensor;

@RestController
@RequestMapping("api/v1/sensors")
@RequiredArgsConstructor
public class SensorController {

    private final SensorService service;

    @GetMapping
    public List<Sensor> receiveAll() {
        return service.getAll();
    }

    @GetMapping("/page")
    public Page<SensorEntity> receiveAll(@RequestParam(defaultValue = "0") final Integer page) {
        return service.getAll(page);
    }

    @GetMapping("/{id}")
    public Sensor receiveById(@PathVariable final Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<Sensor> createOneWithNestedObj(@Valid @RequestBody final Sensor sensor) {
        return new ResponseEntity<>(service.addOneWithNestedObj(sensor), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sensor> updateOne(@Valid @RequestBody final Sensor sensor, @PathVariable final Integer id) {
        return ResponseEntity.ok(service.modifyOneWithNestedObj(sensor, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable final Integer id) {
        service.removeOne(id);
        return ResponseEntity.ok(id);
    }
}
