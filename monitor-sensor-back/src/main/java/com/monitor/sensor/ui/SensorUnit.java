package com.monitor.sensor.ui;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Range;

import com.monitor.sensor.enums.SensorType;

@Data
public class SensorUnit {

    @NotNull(message = "Type of sensor has to be selected")
    private SensorType sensorType;

    @NotNull(message = "(*) The field Unit is mandatory")
    @Size(min = 1, max = 15)
    private String unit;

    @NotNull(message = "(*) The field Range Beginning is mandatory")
    @Range(min = -1000, max = 10000)
    private Integer rangeBegin;

    @NotNull(message = "(*) The field Range End is mandatory")
    @Range(min = -1000, max = 10000)
    private Integer rangeEnd;
}
