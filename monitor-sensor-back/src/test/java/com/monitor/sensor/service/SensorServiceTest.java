package com.monitor.sensor.service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;

import javax.persistence.EntityNotFoundException;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.github.javafaker.Faker;
import com.monitor.sensor.dao.SensorRepo;
import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.error.RangeException;
import com.monitor.sensor.mapper.SensorMapper;
import com.monitor.sensor.service.impl.SensorServiceImpl;
import com.monitor.sensor.ui.Sensor;
import com.monitor.sensor.ui.SensorUnit;

@RunWith(MockitoJUnitRunner.class)
public class SensorServiceTest {

    @InjectMocks
    private SensorServiceImpl service;

    @Mock
    private SensorRepo repo;

    @Mock
    private SensorMapper mapper;

    @Mock
    private SensorUnitService sensorUnitService;

    private static final Faker FAKER = Faker.instance(Locale.ENGLISH, ThreadLocalRandom.current());

    private static final Integer RANDOM_DIGIT = FAKER.number().randomDigit();

    private SensorEntity sensorEntity;

    @Before
    public void init() {
        sensorEntity = Mockito.mock(SensorEntity.class);
    }

    @Test
    public void shouldGetAll() {
        final List<SensorEntity> list = fakeEntityCollection();

        Mockito.when(repo.findAll()).thenReturn(list);
        Mockito.when(mapper.entityToDomain(Mockito.any(SensorEntity.class))).thenReturn(new Sensor());
        Mockito.when(list.stream()).thenReturn(Stream.of(fakeEntity()));
        service.getAll();
        Mockito.verify(repo, Mockito.times(1)).findAll();
        Mockito.verify(mapper, Mockito.times(1)).entityToDomain(Mockito.any(SensorEntity.class));
    }

    @Test
    public void shouldAddOne() {
        final Sensor sensor = fakeSensor();

        Mockito.when(repo.save(sensorEntity)).thenReturn(fakeEntity());
        Mockito.when(mapper.domainToEntity(sensor)).thenReturn(sensorEntity);
        service.addOne(sensor);

        Mockito.verify(repo, Mockito.times(1)).save(sensorEntity);
        Mockito.verify(mapper, Mockito.times(1)).domainToEntity(sensor);
    }

    @Test(expected = RangeException.class)
    public void shouldThrowExceptionWhileAddingOne() {
        final Sensor sensor = fakeSensorThrowing();

        service.addOne(sensor);
    }

    @Test
    public void shouldGetById() {
        Mockito.when(repo.findById(Mockito.anyInt())).thenReturn(Optional.of(fakeEntity()));

        service.getById(RANDOM_DIGIT);
        Mockito.verify(repo, Mockito.times(1)).findById(Mockito.anyInt());
        Mockito.verify(mapper, Mockito.times(1)).entityToDomain(Mockito.any(SensorEntity.class));
    }

    @Test(expected = EntityNotFoundException.class)
    public void shouldThrowExceptionGettingById() {
        Mockito.when(repo.findById(Mockito.anyInt())).thenReturn(Optional.ofNullable(null));

        service.getEntityById(RANDOM_DIGIT);
        Mockito.verify(repo, Mockito.times(1)).findById(Mockito.anyInt());
        Mockito.verify(mapper, Mockito.times(1)).entityToDomain(Mockito.any(SensorEntity.class));
    }

    @Test
    public void shouldGetEntityById() {
        Mockito.when(repo.findById(Mockito.anyInt())).thenReturn(Optional.of(fakeEntity()));

        service.getEntityById(RANDOM_DIGIT);
        Mockito.verify(repo, Mockito.times(1)).findById(Mockito.anyInt());
    }

    @Test
    public void shouldAddOneWithNestedObj() {
        final SensorUnit sensorUnit = Mockito.mock(SensorUnit.class);
        final Sensor sensor = fakeSensor();

        Mockito.when(repo.save(sensorEntity)).thenReturn(fakeEntity());
        Mockito.when(mapper.domainToEntity(sensor)).thenReturn(sensorEntity);

        sensorUnitService.addOneReturningEntity(sensorUnit);
        service.addOneWithNestedObj(sensor);

        Mockito.verify(repo, Mockito.times(1)).save(sensorEntity);
        Mockito.verify(mapper, Mockito.times(1)).domainToEntity(sensor);
    }

    @Test(expected = RangeException.class)
    public void shouldThrowExceptionWhileAddingOneWithNestedObj() {
        final SensorUnit sensorUnit = Mockito.mock(SensorUnit.class);
        final Sensor sensor = fakeSensorThrowing();

        sensorUnitService.addOneReturningEntity(sensorUnit);
        service.addOneWithNestedObj(sensor);
    }

    @Test
    public void shouldModifyOneWithNestedObj() {
        final Sensor sensor = fakeSensor();

        final SensorUnit sensorUnit = Mockito.mock(SensorUnit.class);
        final SensorUnitEntity sensorUnitEntity = Mockito.mock(SensorUnitEntity.class);
        final SensorEntity fakeEntity = fakeEntity();
        fakeEntity.setSensorUnit(sensorUnitEntity);

        Mockito.when(repo.save(Mockito.any(SensorEntity.class))).thenReturn(fakeEntity);
        Mockito.when(mapper.domainToEntity(sensor)).thenReturn(fakeEntity);
        Mockito.when(repo.findById(Mockito.anyInt())).thenReturn(Optional.of(fakeEntity));

        sensorUnitService.modifyOneReturningEntity(sensorUnit, RANDOM_DIGIT);
        service.modifyOneWithNestedObj(sensor, RANDOM_DIGIT);

        Mockito.verify(repo, Mockito.times(1)).save(fakeEntity);
        Mockito.verify(mapper, Mockito.times(1)).domainToEntity(sensor);
        Mockito.verify(repo, Mockito.times(1)).findById(RANDOM_DIGIT);
    }

    @Test(expected = RangeException.class)
    public void shouldThrowExceptionWhileModifyingOneWithNestedObj() {
        final Sensor sensor = fakeSensorThrowing();

        final SensorUnit sensorUnit = Mockito.mock(SensorUnit.class);

        sensorUnitService.modifyOneReturningEntity(sensorUnit, RANDOM_DIGIT);
        service.modifyOneWithNestedObj(sensor, RANDOM_DIGIT);
    }

    @Test
    public void shouldRemoveOne() {
        service.removeOne(sensorEntity.getId());
        Mockito.verify(repo, Mockito.times(1)).deleteById(sensorEntity.getId());
    }

    private List<SensorEntity> fakeEntityCollection() {
        return Mockito.mock(List.class);
    }

    private SensorEntity fakeEntity() {
        final SensorEntity entity = new SensorEntity();
        entity.setId(FAKER.number().randomDigit());
        return entity;
    }

    private Sensor fakeSensorThrowing() {
        final Sensor sensor = new Sensor();
        sensor.setSensorUnit(new SensorUnit());
        sensor.getSensorUnit().setRangeBegin(1);
        sensor.getSensorUnit().setRangeEnd(-1);
        return sensor;
    }

    private Sensor fakeSensor() {
        final Sensor sensor = new Sensor();
        sensor.setSensorUnit(new SensorUnit());
        sensor.getSensorUnit().setRangeBegin(1);
        sensor.getSensorUnit().setRangeEnd(10);
        return sensor;
    }
}
