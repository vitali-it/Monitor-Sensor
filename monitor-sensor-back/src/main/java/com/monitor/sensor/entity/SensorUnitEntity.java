package com.monitor.sensor.entity;

import lombok.Data;
import javax.persistence.*;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.monitor.sensor.enums.SensorType;
import com.vladmihalcea.hibernate.type.basic.PostgreSQLEnumType;

@Entity
@Table(schema = "monitor_sensor", name = "sensor_unit")
@Data
@TypeDef(name = "pgsql_enum", typeClass = PostgreSQLEnumType.class)
public class SensorUnitEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "sensor_type", nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    @Type(type = "pgsql_enum")
    private SensorType sensorType;

    @Column(nullable = false, unique = true)
    private String unit;

    @Column(name = "range_begin", nullable = false, unique = false)
    private Integer rangeBegin;

    @Column(name = "range_end", nullable = false, unique = false)
    private Integer rangeEnd;

    @JsonIgnore
    @OneToOne(mappedBy = "sensorUnit", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = true)
    private SensorEntity sensorEntity;
}
