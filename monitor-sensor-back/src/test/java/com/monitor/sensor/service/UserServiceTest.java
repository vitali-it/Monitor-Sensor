package com.monitor.sensor.service;

import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.github.javafaker.Faker;
import com.monitor.sensor.dao.UserRepo;
import com.monitor.sensor.entity.UserEntity;
import com.monitor.sensor.mapper.UserMapper;
import com.monitor.sensor.service.impl.UserServiceImpl;
import com.monitor.sensor.ui.User;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl service;

    @Mock
    private UserRepo repo;

    @Mock
    private UserMapper mapper;

    @Mock
    private List<UserEntity> fakeEntityCollection;

    private static final Faker FAKER = Faker.instance(Locale.ENGLISH, ThreadLocalRandom.current());

    @Test
    public void shouldGetAll() {
        final List<UserEntity> list = fakeEntityCollection;
        Mockito.when(repo.findAll()).thenReturn(list);
        Mockito.when(mapper.entityToDomain(Mockito.any(UserEntity.class))).thenReturn(new User());
        Mockito.when(list.stream()).thenReturn(Stream.of(fakeEntity()));
        service.getAll();
        Mockito.verify(repo, Mockito.times(1)).findAll();
        Mockito.verify(mapper, Mockito.times(1)).entityToDomain(Mockito.any(UserEntity.class));
    }

    private UserEntity fakeEntity() {
        final UserEntity entity = new UserEntity();
        entity.setId(FAKER.number().randomDigit());
        return entity;
    }
}
