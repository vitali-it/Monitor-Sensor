package com.monitor.sensor.controller.integration;

import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

import org.hamcrest.CoreMatchers;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import com.monitor.sensor.enums.SensorType;
import com.monitor.sensor.service.SensorService;
import com.monitor.sensor.ui.Sensor;
import com.monitor.sensor.ui.SensorUnit;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class SensorControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private SensorService service;

    private static final Faker FAKER = Faker.instance(Locale.FRENCH, ThreadLocalRandom.current());

    @WithMockUser(value = "noname")
    @Test
    public void shouldGetAllWithCorrectPath() throws Exception {
        final Sensor sensor = fakeSensorAndSensorUnit();
        final List<Sensor> sensors = List.of(sensor);
        BDDMockito.given(service.getAll()).willReturn(sensors);

        mvc.perform(MockMvcRequestBuilders.get("/api/v1/sensors").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1))).andExpect(
                        MockMvcResultMatchers.jsonPath("$[0].description", CoreMatchers.is(sensor.getDescription())));
    }

    @WithMockUser(value = "noname")
    @Test
    public void shouldNotFoundWithInCorrectPath() throws Exception {
        final Sensor sensor = fakeSensorAndSensorUnit();
        final List<Sensor> sensors = List.of(sensor);
        BDDMockito.given(service.getAll()).willReturn(sensors);

        mvc.perform(MockMvcRequestBuilders.get("/path/does/not/exist").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void shouldNotAuthorizeWithAnyPath() throws Exception {
        final Sensor sensor = fakeSensorAndSensorUnit();
        final List<Sensor> sensors = List.of(sensor);
        BDDMockito.given(service.getAll()).willReturn(sensors);

        mvc.perform(MockMvcRequestBuilders.get("/api/v1/sensors").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @WithUserDetails(value = "admin")
    @Test
    public void shouldModifyWithCorrectPath() throws Exception {
        final Sensor sensor = fakeSensorAndSensorUnit();
        int id = sensor.getId();
        BDDMockito.given(service.modifyOneWithNestedObj(sensor, sensor.getId())).willReturn(sensor);
        final ObjectMapper objectMapper = new ObjectMapper();

        mvc.perform(MockMvcRequestBuilders.put("/api/v1/sensors/{id}", id)
                .content(objectMapper.writeValueAsBytes(sensor)).contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
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
