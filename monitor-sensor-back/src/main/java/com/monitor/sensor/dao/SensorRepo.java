package com.monitor.sensor.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.monitor.sensor.entity.SensorEntity;

@Repository
public interface SensorRepo extends JpaRepository<SensorEntity, Integer> {

}
