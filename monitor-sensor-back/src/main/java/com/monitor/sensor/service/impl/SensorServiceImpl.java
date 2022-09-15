package com.monitor.sensor.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import com.monitor.sensor.config.YamlProperties;
import com.monitor.sensor.dao.SensorRepo;
import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.error.NoUniqueException;
import com.monitor.sensor.error.RangeException;
import com.monitor.sensor.mapper.SensorMapper;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.service.SensorUnitService;
import com.monitor.sensor.ui.Sensor;

@Service
@RequiredArgsConstructor
public class SensorServiceImpl implements SensorService {

    private static final int DESCRIPTION_MAX_LENGTH = 200;

    private final SensorRepo repo;

    private final SensorMapper mapper;

    private final SensorUnitService sensorUnitService;

    private final YamlProperties yamlProperties;

    @Override
    public List<Sensor> getAll() {
        return repo.findAll().stream().map(mapper::entityToDomain).collect(Collectors.toUnmodifiableList()); // Java10
    }

    @Override
    public Page<SensorEntity> getAll(final Integer page) {
        final Pageable pageable = PageRequest.of(page, 4);
        return repo.findAll(pageable);
    }

    @Override
    public Page<SensorEntity> getAllBySubstr(final Integer page, final String substr) {
        final Pageable pageable = PageRequest.of(page, 4);
        final String toQueryStr = strManager(substr);
        return repo.searchThroughAllFields(toQueryStr, pageable);
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
            final var msg = String.format(yamlProperties.getElement().getNotfound(), id);
            throw new EntityNotFoundException(msg);
        });
    }

    @Override
    public Sensor addOne(final Sensor sensor) {
        sensor.setDescription(Optional.ofNullable(sensor.getDescription()).orElse("").indent(-DESCRIPTION_MAX_LENGTH)); // Java
                                                                                                                        // 12
        rangeVerification(sensor);
        if (!isUniqueName(sensor.getName())) {
            throw new NoUniqueException(yamlProperties.getElement().getAlreadyexist());
        }

        final SensorEntity entity = mapper.domainToEntity(sensor);
        return modelCreation(entity);
    }

    @Override
    public Sensor addOneWithNestedObj(final Sensor sensor) {
        sensor.setDescription(Optional.ofNullable(sensor.getDescription()).orElse("").indent(-DESCRIPTION_MAX_LENGTH)); // Java
                                                                                                                        // 12
        rangeVerification(sensor);
        if (!isUniqueName(sensor.getName())) {
            throw new NoUniqueException(yamlProperties.getElement().getAlreadyexist());
        }
        final SensorUnitEntity sensorUnitEntity = sensorUnitService.addOneReturningEntity(sensor.getSensorUnit());
        final SensorEntity entity = mapper.domainToEntity(sensor);
        entity.setSensorUnit(sensorUnitEntity);
        return modelCreation(entity);
    }

    @Override
    public Sensor modifyOneWithNestedObj(final Sensor sensor, final Integer id) {
        rangeVerification(sensor);
        sensor.setDescription(Optional.ofNullable(sensor.getDescription()).orElse("").indent(-DESCRIPTION_MAX_LENGTH)); // Java
                                                                                                                        // 12
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

    private boolean isUniqueName(final String name) {
        return !repo.findByName(name).isPresent();
    }

    private Sensor modelCreation(final SensorEntity entity) {
        return mapper.entityToDomain(repo.save(Objects.requireNonNull(entity)));
    }

    private String strManager(final String substr) {
        final var toQueryStr = substr.toUpperCase().replaceAll("%", "|%").replaceAll("_", "|_").replaceAll("#", "|#");
        return toQueryStr;
    }

    private void rangeVerification(final Sensor sensor) {
        if (sensor.getSensorUnit().getRangeBegin() > sensor.getSensorUnit().getRangeEnd()) {
            throw new RangeException("The start value cannot exceed the range's end");
        }
    }
}
