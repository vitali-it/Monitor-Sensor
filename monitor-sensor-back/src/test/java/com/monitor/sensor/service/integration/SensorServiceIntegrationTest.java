package com.monitor.sensor.service.integration;

import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.github.javafaker.Faker;
import com.monitor.sensor.enums.SensorType;
import com.monitor.sensor.error.ElementNotFoundException;
import com.monitor.sensor.error.NoUniqueException;
import com.monitor.sensor.error.RangeException;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.ui.Sensor;
import com.monitor.sensor.ui.SensorUnit;

@SpringBootTest
@ActiveProfiles("test")
public class SensorServiceIntegrationTest {

    @Autowired
    private SensorService sensorService;

    private static final Faker FAKER = Faker.instance(Locale.FRENCH, ThreadLocalRandom.current());

    @Test
    public void shouldSaveSensorAndNestedSensorUnitAndDeleteThemAndGetAll() {
        final Sensor sensor = fakeSensorAndSensorUnit();
        final int quantityBefore = sensorService.getAll().size();
        final Sensor addedSensor = sensorService.addOneWithNestedObj(sensor);
        final int quantityAfterSaving = sensorService.getAll().size();
        sensorService.removeOne(addedSensor.getId());
        final int quantityAfterCleanup = sensorService.getAll().size();

        Assertions.assertNotNull(addedSensor);
        Assertions.assertNotEquals(quantityBefore, quantityAfterSaving);
        Assertions.assertEquals(quantityBefore, quantityAfterCleanup);
        Assertions.assertEquals(sensor.getLocation(), addedSensor.getLocation());
        Assertions.assertTrue(quantityAfterSaving > 0);
    }

    @Test
    public void shouldThrowRangeExeption() {
        final Sensor sensor = fakeSensorAndSensorUnit();
        final SensorUnit sensorUnit = sensor.getSensorUnit();
        sensorUnit.setRangeEnd(sensor.getSensorUnit().getRangeBegin() - 1);
        sensor.setSensorUnit(sensorUnit);
        final int quantityBefore = sensorService.getAll().size();

        Assertions.assertThrows(RangeException.class, () -> sensorService.addOneWithNestedObj(sensor));
        final int quantityAfterTrying = sensorService.getAll().size();
        Assertions.assertNotNull(sensor);
        Assertions.assertEquals(quantityBefore, quantityAfterTrying);
        Assertions.assertTrue(sensor.getSensorUnit().getRangeBegin() > sensor.getSensorUnit().getRangeEnd());
    }

    @Test
    public void shouldThrowNoUniqueExeption() {
        final Sensor sensor = fakeSensorAndSensorUnit();
        final int quantityBefore = sensorService.getAll().size();
        final Sensor addedSensor = sensorService.addOneWithNestedObj(sensor);

        Assertions.assertThrows(NoUniqueException.class, () -> sensorService.addOneWithNestedObj(sensor));
        sensorService.removeOne(addedSensor.getId());
        final int quantityAfter = sensorService.getAll().size();

        Assertions.assertNotNull(sensor);
        Assertions.assertEquals(quantityBefore, quantityAfter);
    }

    @Test
    public void shouldThrowElementNotFoundExeption() {
        final int quantityBefore = sensorService.getAll().size();
        Assertions.assertThrows(ElementNotFoundException.class, () -> sensorService.removeOne(Integer.MAX_VALUE));
        Assertions.assertThrows(ElementNotFoundException.class, () -> sensorService.getById(Integer.MAX_VALUE));
        final int quantityAfter = sensorService.getAll().size();
        Assertions.assertEquals(quantityBefore, quantityAfter);
    }

    private Sensor fakeSensorAndSensorUnit() {
        final Sensor sensor = new Sensor();
        final SensorUnit sensorUnit = new SensorUnit();
        sensorUnit.setSensorType(SensorType.HUMIDITY);
        sensorUnit.setUnit("%");
        sensorUnit.setRangeBegin(0);
        sensorUnit.setRangeEnd(10);
        sensor.setId(Integer.MIN_VALUE);
        sensor.setName(FAKER.cat().name() + FAKER.dog().name());
        sensor.setModel(FAKER.cat().name());
        sensor.setLocation(FAKER.address().city());
        sensor.setSensorUnit(sensorUnit);
        sensor.setDescription(FAKER.chuckNorris().fact());
        return sensor;
    }
}
