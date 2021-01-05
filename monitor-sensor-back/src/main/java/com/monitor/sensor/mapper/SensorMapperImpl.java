package com.monitor.sensor.mapper;

import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.ui.Sensor;
import com.monitor.sensor.ui.SensorUnit;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-01-05T02:03:04+0300",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 13.0.2 (Oracle Corporation)"
)
@Component
public class SensorMapperImpl implements SensorMapper {

    @Override
    public SensorEntity domainToEntity(Sensor domain) {
        if ( domain == null ) {
            return null;
        }

        SensorEntity sensorEntity = new SensorEntity();

        sensorEntity.setId( domain.getId() );
        sensorEntity.setSensorUnit( sensorUnitToSensorUnitEntity( domain.getSensorUnit() ) );
        sensorEntity.setName( domain.getName() );
        sensorEntity.setModel( domain.getModel() );
        sensorEntity.setDescription( domain.getDescription() );
        sensorEntity.setLocation( domain.getLocation() );
        sensorEntity.setCreatedDate( domain.getCreatedDate() );
        sensorEntity.setUpdatedDate( domain.getUpdatedDate() );

        return sensorEntity;
    }

    @Override
    public Sensor entityToDomain(SensorEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Sensor sensor = new Sensor();

        sensor.setId( entity.getId() );
        sensor.setSensorUnit( sensorUnitEntityToSensorUnit( entity.getSensorUnit() ) );
        sensor.setName( entity.getName() );
        sensor.setModel( entity.getModel() );
        sensor.setDescription( entity.getDescription() );
        sensor.setLocation( entity.getLocation() );
        sensor.setCreatedDate( entity.getCreatedDate() );
        sensor.setUpdatedDate( entity.getUpdatedDate() );

        return sensor;
    }

    protected SensorUnitEntity sensorUnitToSensorUnitEntity(SensorUnit sensorUnit) {
        if ( sensorUnit == null ) {
            return null;
        }

        SensorUnitEntity sensorUnitEntity = new SensorUnitEntity();

        sensorUnitEntity.setSensorType( sensorUnit.getSensorType() );
        sensorUnitEntity.setUnit( sensorUnit.getUnit() );
        sensorUnitEntity.setRangeBegin( sensorUnit.getRangeBegin() );
        sensorUnitEntity.setRangeEnd( sensorUnit.getRangeEnd() );

        return sensorUnitEntity;
    }

    protected SensorUnit sensorUnitEntityToSensorUnit(SensorUnitEntity sensorUnitEntity) {
        if ( sensorUnitEntity == null ) {
            return null;
        }

        SensorUnit sensorUnit = new SensorUnit();

        sensorUnit.setSensorType( sensorUnitEntity.getSensorType() );
        sensorUnit.setUnit( sensorUnitEntity.getUnit() );
        sensorUnit.setRangeBegin( sensorUnitEntity.getRangeBegin() );
        sensorUnit.setRangeEnd( sensorUnitEntity.getRangeEnd() );

        return sensorUnit;
    }
}
