package com.monitor.sensor.entity;

import java.time.LocalDateTime;
import lombok.Data;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(schema = "monitor_sensor", name = "sensor")
@Data
public class SensorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "sensor_type_id", nullable = false)
    private SensorUnitEntity sensorUnit;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String model;

    @Column(nullable = true, unique = false)
    private String description;

    @Column(nullable = true, unique = false)
    private String location;

    @CreationTimestamp
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate;
}
