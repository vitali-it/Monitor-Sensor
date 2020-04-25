package com.monitor.sensor.controller;

import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.github.javafaker.Faker;
import com.monitor.sensor.service.SensorUnitService;
import com.monitor.sensor.ui.SensorUnit;

@RunWith(MockitoJUnitRunner.class)
public class SensorUnitControllerTest {

    @InjectMocks
    private SensorUnitController controller;

    @Mock
    private SensorUnitService service;

    private static final Faker FAKER = Faker.instance(Locale.ENGLISH, ThreadLocalRandom.current());

    @Test
    public void shouldReceiveAll() {
        final Integer id = FAKER.number().randomDigit();
        controller.receiveById(id);
        Mockito.verify(service, Mockito.times(1)).getById(id);
    }

    @Test
    public void shouldReceiveById() {
        controller.receiveAll();
        Mockito.verify(service, Mockito.times(1)).getAll();
    }

    @Test
    public void shouldCreateOne() {
        final SensorUnit sensorUnit = Mockito.mock(SensorUnit.class);
        controller.createOne(sensorUnit);
        Mockito.verify(service, Mockito.times(1)).addOne(sensorUnit);
    }

    @Test
    public void shouldUpdateOne() {
        final Integer id = FAKER.number().randomDigit();
        final SensorUnit sensorUnit = Mockito.mock(SensorUnit.class);
        controller.updateOne(sensorUnit, id);
        Mockito.verify(service, Mockito.times(1)).modifyOne(sensorUnit, id);
    }

    @Test
    public void shouldDeleteOne() {
        final Integer id = FAKER.number().randomDigit();
        controller.deleteOne(id);
        Mockito.verify(service, Mockito.times(1)).removeOne(id);
    }
}
