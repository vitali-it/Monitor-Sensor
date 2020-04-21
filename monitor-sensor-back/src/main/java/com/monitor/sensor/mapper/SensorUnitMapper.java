package com.monitor.sensor.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.ui.SensorUnit;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SensorUnitMapper {

    SensorUnitEntity domainToEntity(SensorUnit domain);
    
    SensorUnit entityToDomain(SensorUnitEntity entity);
}
