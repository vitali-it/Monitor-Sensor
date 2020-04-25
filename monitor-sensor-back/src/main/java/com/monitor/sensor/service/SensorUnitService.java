package com.monitor.sensor.service;

import java.util.List;

import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.ui.SensorUnit;

public interface SensorUnitService {

    List<SensorUnit> getAll();

    SensorUnit addOne(SensorUnit sensorUnit);

    SensorUnitEntity addOneReturningEntity(SensorUnit sensorUnit);

    SensorUnit getById(Integer id);

    SensorUnit modifyOne(SensorUnit sensorUnit, Integer id);

    SensorUnitEntity getEntityById(Integer id);

    SensorUnitEntity modifyOneReturningEntity(SensorUnit sensorUnit, Integer id);

    void removeOne(Integer id);

}
