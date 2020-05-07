package com.monitor.sensor.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.NoArgsConstructor;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
@NoArgsConstructor
public class ElementNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ElementNotFoundException(final String message) {
        super(message);
    }

    public ElementNotFoundException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
