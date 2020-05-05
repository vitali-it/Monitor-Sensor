package com.monitor.sensor.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import com.monitor.sensor.dao.SensorRepo;
import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.mapper.SensorMapper;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.service.SensorUnitService;
import com.monitor.sensor.ui.Sensor;

@Service
@RequiredArgsConstructor
public class SensorServiceImpl implements SensorService {

    private final SensorRepo repo;

    private final SensorMapper mapper;

    private final SensorUnitService sensorUnitService;

    @Override
    public List<Sensor> getAll() {
        return repo.findAll().stream().map(mapper::entityToDomain).collect(Collectors.toList());
    }

    @Override
    public Page<SensorEntity> getAll(final Integer page) {
        Pageable pageable = PageRequest.of(page, 4);
        return repo.findAll(pageable);
    }

    @Override
    public Page<SensorEntity> getAllBySubstr(final Integer page, final String substr) {
        Pageable pageable = PageRequest.of(page, 4);
        final String toQueryStr = strManager(substr);
        return repo.searchThroughAllFields(toQueryStr, pageable);
    }

    private String strManager(final String substr) {
        final String toQueryStr = substr.toUpperCase().replaceAll("%", "|%").replaceAll("_", "|_").replaceAll("#", "|#");
        return toQueryStr;
    }

    @Override
    @SneakyThrows
    public Sensor getById(final Integer id) {
        return mapper.entityToDomain(getEntityById(id));
    }

    @Override
    @SneakyThrows
    public SensorEntity getEntityById(final Integer id) {
        return repo.findById(id).orElseThrow(() -> {
            final String msg = String.format("Not found #: %s", id);
            throw new EntityNotFoundException(msg);
        });
    }

    @Override
    public Sensor addOne(final Sensor sensor) {
        final SensorEntity entity = mapper.domainToEntity(sensor);
        return modelCreation(entity);
    }

    @Override
    public Sensor addOneWithNestedObj(final Sensor sensor) {
        final SensorUnitEntity sensorUnitEntity = sensorUnitService.addOneReturningEntity(sensor.getSensorUnit());
        final SensorEntity entity = mapper.domainToEntity(sensor);
        entity.setSensorUnit(sensorUnitEntity);
        return modelCreation(entity);
    }

    @Override
    public Sensor modifyOneWithNestedObj(final Sensor sensor, final Integer id) {
        final SensorEntity entityFound = getEntityById(id);
        final SensorUnitEntity sensorUnitModified = sensorUnitService.modifyOneReturningEntity(sensor.getSensorUnit(),
                entityFound.getSensorUnit().getId());

        final SensorEntity entity = mapper.domainToEntity(sensor);
        entity.setId(id);
        entity.setSensorUnit(sensorUnitModified);
        entity.setCreatedDate(entityFound.getCreatedDate());
        return mapper.entityToDomain(repo.save(entity));
    }

    @Override
    public void removeOne(final Integer id) {
        repo.deleteById(id);
    }

    private Sensor modelCreation(final SensorEntity entity) {
        return mapper.entityToDomain(repo.save(Objects.requireNonNull(entity)));
    }
}
