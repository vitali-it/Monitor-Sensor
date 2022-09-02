package com.monitor.sensor.controller;

import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.github.javafaker.Faker;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.ui.Sensor;

@ExtendWith(MockitoExtension.class)
public class SensorControllerTest {

    @InjectMocks
    private SensorController controller;

    @Mock
    private SensorService service;

    private static final Faker FAKER = Faker.instance(Locale.ENGLISH, ThreadLocalRandom.current());

    @Test
    public void shouldReceiveAll() {
        controller.receiveAll();
        Mockito.verify(service, Mockito.times(1)).getAll();
    }

    @Test
    public void shouldReceiveAllWithPagination() {
        final Integer page = FAKER.number().randomDigit();
        controller.receiveAll(page);
        Mockito.verify(service, Mockito.times(1)).getAll(page);
    }
    
    @Test
    public void shouldSeekBySubStrAllWithPagination() {
        final Integer page = FAKER.number().randomDigit();
        final String substr = FAKER.lorem().toString();
        controller.search(page, substr);
        Mockito.verify(service, Mockito.times(1)).getAllBySubstr(page, substr);
    }

    @Test
    public void shouldReceiveById() {
        final Integer id = FAKER.number().randomDigit();
        controller.receiveById(id);
        Mockito.verify(service, Mockito.times(1)).getById(id);
    }

    @Test
    public void shouldCreateOneWithNestedObj() {
        Sensor sensor = Mockito.mock(Sensor.class);
        controller.createOneWithNestedObj(sensor);
        Mockito.verify(service, Mockito.times(1)).addOneWithNestedObj(sensor);
    }

    @Test
    public void shouldUpdateOne() {
        final Integer id = FAKER.number().randomDigit();
        final Sensor sensor = Mockito.mock(Sensor.class);
        controller.updateOne(sensor, id);
        Mockito.verify(service, Mockito.times(1)).modifyOneWithNestedObj(sensor, id);
    }

    @Test
    public void shouldDeleteOne() {
        final Integer id = FAKER.number().randomDigit();
        controller.deleteOne(id);
        Mockito.verify(service, Mockito.times(1)).removeOne(id);
    }
}
