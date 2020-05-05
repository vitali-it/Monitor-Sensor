package com.monitor.sensor.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.monitor.sensor.entity.SensorEntity;

@Repository
public interface SensorRepo extends JpaRepository<SensorEntity, Integer> {

    @Query("FROM SensorEntity s WHERE UPPER(s.sensorUnit.unit) LIKE %:substr% OR "
            + "STR(s.sensorUnit.sensorType) LIKE %:substr% OR STR(s.sensorUnit.range) LIKE %:substr% OR "
            + "UPPER(s.description) LIKE %:substr% OR UPPER(s.location) LIKE %:substr% OR "
            + "UPPER(s.name) LIKE %:substr% OR UPPER(s.model) LIKE %:substr%")
    Page<SensorEntity> searchThroughAllFields(@Param("substr") final String substr, Pageable pageable);
}
