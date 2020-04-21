package com.monitor.sensor.ui;

import java.time.LocalDateTime;
import lombok.Data;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.monitor.sensor.enums.UserRole;

@Data
public class User {

    private Integer id;

    @NotNull(message = "(*) The field Login is mandatory")
    @Size(min = 5, max = 20)
    private String login;

    @NotNull(message = "(*) The field Password is mandatory")
    private String password;

    @NotNull(message = "A Role must be chosen")
    private UserRole role;

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
