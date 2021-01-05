package com.monitor.sensor.error;

import java.time.LocalDateTime;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.jsonwebtoken.SignatureException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorBean> sqlConstraintsHandler(final ConstraintViolationException exc) {
        ErrorBean error = new ErrorBean("The request violates data base constraints", LocalDateTime.now(),
                HttpStatus.CONFLICT.value());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorBean> nullPointerHandler(final NullPointerException exc) {
        ErrorBean error = new ErrorBean("An error occurred on the server side", LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorBean> jwtCorruptionHandler(final SignatureException exc) {
        ErrorBean error = new ErrorBean("The token cannot be trusted", LocalDateTime.now(),
                HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}
