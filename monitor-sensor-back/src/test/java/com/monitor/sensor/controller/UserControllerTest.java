package com.monitor.sensor.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.monitor.sensor.service.UserService;

@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @InjectMocks
    private UserController controller;

    @Mock
    private UserService service;

    @Test
    public void shouldReceiveAll() {
        controller.receiveAll();
        Mockito.verify(service, Mockito.times(1)).getAll();
    }
}
