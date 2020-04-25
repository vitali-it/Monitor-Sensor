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
import com.monitor.sensor.dao.SensorUnitRepo;
import com.monitor.sensor.entity.SensorUnitEntity;
import com.monitor.sensor.mapper.SensorUnitMapper;
import com.monitor.sensor.service.impl.SensorUnitServiceImpl;
import com.monitor.sensor.ui.SensorUnit;

@RunWith(MockitoJUnitRunner.class)
public class SensorUnitServiceTest {

    @InjectMocks
    private SensorUnitServiceImpl service;

    @Mock
    private SensorUnitRepo repo;

    @Mock
    private SensorUnitMapper mapper;

    private static final Faker FAKER = Faker.instance(Locale.ENGLISH, ThreadLocalRandom.current());

    private static final Integer RANDOM_DIGIT = FAKER.number().randomDigit();

    private SensorUnit sensorUnit;

    private SensorUnitEntity sensorUnitEntity;

    @Before
    public void init() {
        sensorUnit = Mockito.mock(SensorUnit.class);
        sensorUnitEntity = Mockito.mock(SensorUnitEntity.class);
    }

    @Test
    public void shouldGetAll() {
        final List<SensorUnitEntity> list = fakeEntityCollection();

        Mockito.when(repo.findAll()).thenReturn(list);
        Mockito.when(mapper.entityToDomain(Mockito.any(SensorUnitEntity.class))).thenReturn(new SensorUnit());
        Mockito.when(list.stream()).thenReturn(Stream.of(fakeEntity()));
        service.getAll();
        Mockito.verify(repo, Mockito.times(1)).findAll();
        Mockito.verify(mapper, Mockito.times(1)).entityToDomain(Mockito.any(SensorUnitEntity.class));
    }

    @Test
    public void shouldGetById() {
        Mockito.when(repo.findById(Mockito.anyInt())).thenReturn(Optional.of(fakeEntity()));

        service.getById(RANDOM_DIGIT);
        Mockito.verify(repo, Mockito.times(1)).findById(Mockito.anyInt());
        Mockito.verify(mapper, Mockito.times(1)).entityToDomain(Mockito.any(SensorUnitEntity.class));
    }

    @Test(expected = EntityNotFoundException.class)
    public void shouldThrowExceptionGettingById() {
        Mockito.when(repo.findById(Mockito.anyInt())).thenReturn(Optional.ofNullable(null));

        service.getEntityById(RANDOM_DIGIT);
        Mockito.verify(repo, Mockito.times(1)).findById(Mockito.anyInt());
        Mockito.verify(mapper, Mockito.times(1)).entityToDomain(Mockito.any(SensorUnitEntity.class));
    }

    @Test
    public void shouldGetEntityById() {
        Mockito.when(repo.findById(Mockito.anyInt())).thenReturn(Optional.of(fakeEntity()));

        service.getEntityById(RANDOM_DIGIT);
        Mockito.verify(repo, Mockito.times(1)).findById(Mockito.anyInt());
    }

    @Test
    public void shouldAddOne() {
        Mockito.when(repo.save(sensorUnitEntity)).thenReturn(fakeEntity());
        Mockito.when(mapper.domainToEntity(sensorUnit)).thenReturn(sensorUnitEntity);

        service.addOne(sensorUnit);

        Mockito.verify(repo, Mockito.times(1)).save(sensorUnitEntity);
        Mockito.verify(mapper, Mockito.times(1)).domainToEntity(sensorUnit);
    }

    @Test
    public void shouldAddOneReturningEntity() {
        Mockito.when(repo.save(sensorUnitEntity)).thenReturn(fakeEntity());
        Mockito.when(mapper.domainToEntity(sensorUnit)).thenReturn(sensorUnitEntity);

        service.addOneReturningEntity(sensorUnit);

        Mockito.verify(repo, Mockito.times(1)).save(sensorUnitEntity);
        Mockito.verify(mapper, Mockito.times(1)).domainToEntity(sensorUnit);
    }

    @Test
    public void shouldModifyOneReturningEntity() {
        Mockito.when(mapper.domainToEntity(sensorUnit)).thenReturn(sensorUnitEntity);
        Mockito.when(repo.save(sensorUnitEntity)).thenReturn(fakeEntity());

        service.modifyOneReturningEntity(sensorUnit, fakeEntity().getId());

        Mockito.verify(repo, Mockito.times(1)).save(sensorUnitEntity);
        Mockito.verify(mapper, Mockito.times(1)).domainToEntity(sensorUnit);
    }

    @Test
    public void shouldModifyOne() {
        Mockito.when(mapper.domainToEntity(sensorUnit)).thenReturn(sensorUnitEntity);
        Mockito.when(repo.save(sensorUnitEntity)).thenReturn(fakeEntity());

        service.modifyOne(sensorUnit, fakeEntity().getId());

        Mockito.verify(repo, Mockito.times(1)).save(sensorUnitEntity);
        Mockito.verify(mapper, Mockito.times(1)).domainToEntity(sensorUnit);
    }

    @Test
    public void shouldRemoveOne() {
        service.removeOne(sensorUnitEntity.getId());
        Mockito.verify(repo, Mockito.times(1)).deleteById(sensorUnitEntity.getId());
    }

    private List<SensorUnitEntity> fakeEntityCollection() {
        return Mockito.mock(List.class);
    }

    private SensorUnitEntity fakeEntity() {
        final SensorUnitEntity entity = new SensorUnitEntity();
        entity.setId(RANDOM_DIGIT);
        return entity;
    }
}
