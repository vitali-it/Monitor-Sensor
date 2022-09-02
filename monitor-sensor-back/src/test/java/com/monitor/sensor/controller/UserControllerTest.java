package com.monitor.sensor.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.monitor.sensor.service.UserService;

@ExtendWith(MockitoExtension.class)
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
