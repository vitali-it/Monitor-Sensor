package com.monitor.sensor.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.NoArgsConstructor;

@ResponseStatus(value = HttpStatus.CONFLICT)
@NoArgsConstructor
public class NoUniqueException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public NoUniqueException(final String message) {
        super(message);
    }

    public NoUniqueException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
