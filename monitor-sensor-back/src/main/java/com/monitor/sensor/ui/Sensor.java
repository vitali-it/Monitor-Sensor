package com.monitor.sensor.ui;

import java.time.LocalDateTime;
import lombok.Data;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Data
public class Sensor {

    private Integer id;

    @NotNull
    private SensorUnit sensorUnit;

    @NotNull(message = "(*) The field Name is mandatory")
    @Size(min = 5, max = 30, message = "The Name cannot exceed 30 characters (at least 5 are required)")
    private String name;

    @NotNull(message = "(*) The field Model is mandatory")
    @Size(min = 3, max = 15, message = "The Name cannot exceed 15 characters (at least 3 are required)")
    private String model;

    @Size(max = 200, message = "The Description cannot exceed 200 characters")
    private String description;

    @Size(max = 40, message = "The Location's name cannot exceed 40 characters")
    private String location;

    @PastOrPresent(message = "Future cannot be set for created date time")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime updatedDate;
}
