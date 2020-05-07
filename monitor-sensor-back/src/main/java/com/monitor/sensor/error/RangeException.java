package com.monitor.sensor.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.NoArgsConstructor;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
@NoArgsConstructor
public class RangeException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public RangeException(final String message) {
        super(message);
    }

    public RangeException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
