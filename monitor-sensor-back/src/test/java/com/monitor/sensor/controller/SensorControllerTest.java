package com.monitor.sensor.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.monitor.sensor.service.SensorService;

@RunWith(MockitoJUnitRunner.class)
public class SensorControllerTest {

    @InjectMocks
    private SensorController controller;

    @Mock
    private SensorService service;

    @Test
    public void shouldReceiveAll() {
        controller.receiveAll();
        Mockito.verify(service, Mockito.times(1)).getAll();
    }
}
