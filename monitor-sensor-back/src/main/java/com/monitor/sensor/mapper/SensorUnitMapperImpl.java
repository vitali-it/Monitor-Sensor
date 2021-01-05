package com.monitor.sensor.mapper;

import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.ui.SensorUnit;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-01-05T02:03:05+0300",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 13.0.2 (Oracle Corporation)"
)
@Component
public class SensorUnitMapperImpl implements SensorUnitMapper {

    @Override
    public SensorUnitEntity domainToEntity(SensorUnit domain) {
        if ( domain == null ) {
            return null;
        }

        SensorUnitEntity sensorUnitEntity = new SensorUnitEntity();

        sensorUnitEntity.setSensorType( domain.getSensorType() );
        sensorUnitEntity.setUnit( domain.getUnit() );
        sensorUnitEntity.setRangeBegin( domain.getRangeBegin() );
        sensorUnitEntity.setRangeEnd( domain.getRangeEnd() );

        return sensorUnitEntity;
    }

    @Override
    public SensorUnit entityToDomain(SensorUnitEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SensorUnit sensorUnit = new SensorUnit();

        sensorUnit.setSensorType( entity.getSensorType() );
        sensorUnit.setUnit( entity.getUnit() );
        sensorUnit.setRangeBegin( entity.getRangeBegin() );
        sensorUnit.setRangeEnd( entity.getRangeEnd() );

        return sensorUnit;
    }
}
