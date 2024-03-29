package com.monitor.sensor.dao;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.monitor.sensor.entity.SensorEntity;

@Repository
public interface SensorRepo extends JpaRepository<SensorEntity, Integer> {

    // Java15
    @Query("""
              FROM SensorEntity s WHERE UPPER(s.sensorUnit.unit) LIKE %:substr%  ESCAPE '|' OR
                   STR(s.sensorUnit.sensorType) LIKE %:substr% ESCAPE '|' OR
                   STR(s.sensorUnit.rangeBegin) LIKE %:substr% ESCAPE '|' OR
                   STR(s.sensorUnit.rangeEnd) LIKE %:substr% ESCAPE '|' OR
                   UPPER(s.description) LIKE %:substr% ESCAPE '|' OR UPPER(s.location) LIKE %:substr% ESCAPE '|' OR
                   UPPER(s.name) LIKE %:substr% ESCAPE '|' OR UPPER(s.model) LIKE %:substr% ESCAPE '|'
            """)
    Page<SensorEntity> searchThroughAllFields(@Param("substr") final String substr, Pageable pageable);

    Optional<SensorEntity> findByName(final String name);
}
