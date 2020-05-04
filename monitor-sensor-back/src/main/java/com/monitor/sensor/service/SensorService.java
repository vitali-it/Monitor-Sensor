package com.monitor.sensor.service;

import java.util.List;
import org.springframework.data.domain.Page;
import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.ui.Sensor;

public interface SensorService {

    List<Sensor> getAll();

    Sensor addOne(Sensor sensor);

    Sensor addOneWithNestedObj(Sensor sensor);

    Sensor getById(Integer id);

    Sensor modifyOneWithNestedObj(Sensor sensor, Integer id);

    SensorEntity getEntityById(Integer id);

    void removeOne(Integer id);

    Page<SensorEntity> getAll(Integer page);
}
