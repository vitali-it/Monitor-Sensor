package com.monitor.sensor.service;

import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.github.javafaker.Faker;
import com.monitor.sensor.dao.SensorRepo;
import com.monitor.sensor.entity.SensorEntity;
import com.monitor.sensor.mapper.SensorMapper;
import com.monitor.sensor.service.impl.SensorServiceImpl;
import com.monitor.sensor.ui.Sensor;

@RunWith(MockitoJUnitRunner.class)
public class SensorServiceTest {

    @InjectMocks
    private SensorServiceImpl service;

    @Mock
    private SensorRepo repo;

    @Mock
    private SensorMapper mapper;

    private static final Faker FAKER = Faker.instance(Locale.ENGLISH, ThreadLocalRandom.current());

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

    private List<SensorEntity> fakeEntityCollection() {
        return Mockito.mock(List.class);
    }

    private SensorEntity fakeEntity() {
        final SensorEntity entity = new SensorEntity();
        entity.setId(FAKER.number().randomDigit());
        return entity;
    }

}
