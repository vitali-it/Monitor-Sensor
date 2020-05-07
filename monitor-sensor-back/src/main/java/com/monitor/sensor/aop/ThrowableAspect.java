package com.monitor.sensor.aop;

import javax.persistence.EntityNotFoundException;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Component;
import com.monitor.sensor.error.ElementNotFoundException;

import lombok.extern.slf4j.Slf4j;

@Component
@Aspect
@Slf4j
public class ThrowableAspect {

    @Pointcut("execution(* com.monitor.sensor.controller.*.*(..) )")
    private void controllerLayer() {
    }

    @Pointcut("execution(* com.monitor.sensor.service.*.*.*(..) )")
    private void serviceLayer() {
    }

    @Pointcut("execution(* com.monitor.sensor.*.*.*.*(..) )")
    private void everyWhere() {
    }

    @Pointcut("serviceLayer() || controllerLayer()")
    private void controllerAndServiceLayers() {
    }

    @Around("serviceLayer()")
    public Object aroundRemoval(final ProceedingJoinPoint pjp) throws Throwable {
        Object result;
        try {
            result = pjp.proceed();
        } catch (final EmptyResultDataAccessException e) {
            log.warn(e.getMessage());
            result = "Element does not exist for removal";
            throw new ElementNotFoundException("Element does not exist");
        }
        return result;

    }

    @Around("serviceLayer()")
    public Object aroundLookingById(final ProceedingJoinPoint pjp) throws Throwable {
        Object result;
        try {
            result = pjp.proceed();
        } catch (final EntityNotFoundException e) {
            final String msg = e.getMessage();
            log.warn(msg);
            result = "Element does not exist";
            throw new ElementNotFoundException(msg);
        }
        return result;

    }
}
