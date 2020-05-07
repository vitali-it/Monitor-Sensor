package com.monitor.sensor.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.NoArgsConstructor;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
@NoArgsConstructor
public class AuthorizationException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public AuthorizationException(final String message) {
        super(message);
    }

    public AuthorizationException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
