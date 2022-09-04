package com.monitor.sensor.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import org.springframework.stereotype.Service;
import com.monitor.sensor.dao.SensorUnitRepo;
import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.mapper.SensorUnitMapper;
import com.monitor.sensor.service.SensorUnitService;
import com.monitor.sensor.ui.SensorUnit;

@Service
@RequiredArgsConstructor
public class SensorUnitServiceImpl implements SensorUnitService {

    private final SensorUnitRepo repo;

    private final SensorUnitMapper mapper;

    @Override
    public List<SensorUnit> getAll() {
        return repo.findAll().stream().map(mapper::entityToDomain).collect(Collectors.toUnmodifiableList()); // Java10
    }

    @Override
    public List<SensorUnitEntity> getAllEntities() {
        return repo.findAll();
    }

    @Override
    @SneakyThrows
    public SensorUnit getById(final Integer id) {
        return mapper.entityToDomain(getEntityById(id));
    }

    @Override
    @SneakyThrows
    public SensorUnitEntity getEntityById(final Integer id) {
        return repo.findById(id).orElseThrow(() -> {
            final String msg = String.format("Not found #: %s", id);
            throw new EntityNotFoundException(msg);
        });
    }

    @Override
    public SensorUnit addOne(final SensorUnit sensorUnit) {
        final SensorUnitEntity entity = mapper.domainToEntity(sensorUnit);
        return mapper.entityToDomain(entityCreation(entity));
    }

    @Override
    public SensorUnitEntity addOneReturningEntity(final SensorUnit sensorUnit) {
        final SensorUnitEntity entity = mapper.domainToEntity(sensorUnit);
        return entityCreation(entity);
    }

    @Override
    public SensorUnit modifyOne(final SensorUnit sensorUnit, final Integer id) {
        final SensorUnitEntity entity = mapper.domainToEntity(sensorUnit);
        entity.setId(id);
        return mapper.entityToDomain(repo.save(entity));
    }

    @Override
    public void modifyAll(final List<SensorUnitEntity> sensorUnitEntities) {
        repo.saveAll(sensorUnitEntities);
    }

    @Override
    public SensorUnitEntity modifyOneReturningEntity(final SensorUnit sensorUnit, final Integer id) {
        final SensorUnitEntity entity = mapper.domainToEntity(sensorUnit);
        entity.setId(id);
        return repo.save(entity);
    }

    @Override
    public void removeOne(final Integer id) {
        repo.deleteById(id);
    }

    private SensorUnitEntity entityCreation(final SensorUnitEntity entity) {
        return repo.save(Objects.requireNonNull(entity));
    }
}
