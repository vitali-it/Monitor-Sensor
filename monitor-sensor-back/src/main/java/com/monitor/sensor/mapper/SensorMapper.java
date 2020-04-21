package com.monitor.sensor.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.ui.Sensor;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SensorMapper {

    SensorEntity domainToEntity(Sensor domain);
    
    Sensor entityToDomain(SensorEntity entity);
}
