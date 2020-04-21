package com.monitor.sensor.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitor.sensor.entity.SensorUnitEntity;

public interface SensorUnitRepo extends JpaRepository<SensorUnitEntity, Integer> {

}
