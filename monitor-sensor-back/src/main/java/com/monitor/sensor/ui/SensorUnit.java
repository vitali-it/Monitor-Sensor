package com.monitor.sensor.ui;

import lombok.Data;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.monitor.sensor.enums.SensorType;

@Data
public class SensorUnit {

    private Integer id;

    @NotNull(message = "Type of sensor has to be selected")
    private SensorType sensorType;

    @NotNull(message = "(*) The field Unit is mandatory")
    @Size(min = 1, max = 15)
    private String unit;

    @NotNull(message = "(*) The field Range is mandatory")
    @Size(min = -1000, max = 1000)
    private Integer range;
}