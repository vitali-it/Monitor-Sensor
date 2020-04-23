package com.monitor.sensor.security;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtResponse {

    private final String jwtToken;

    public String getToken() {
        return this.jwtToken;
    }

}
