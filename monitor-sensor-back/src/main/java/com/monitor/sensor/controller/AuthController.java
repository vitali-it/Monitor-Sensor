package com.monitor.sensor.controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.monitor.sensor.security.*;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserDetailsService userDetailsService;

    @PostMapping(value = "/authentication")
    public ResponseEntity<Map<String, Object>> createAuthenticationToken(@RequestBody final JwtRequest authenticationRequest) {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);
        final Map<String, Object> responseBody = new HashMap<>();
        Optional<? extends GrantedAuthority> authority = userDetails.getAuthorities().stream().findFirst();
        String role = "";

        if (authority.isPresent()) {
            role = authority.get().getAuthority().replace("ROLE_", "");
        }

        responseBody.put("token", token);
        responseBody.put("role", role);
        return ResponseEntity.ok(responseBody);
    }

    private void authenticate(final String username, final String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (final DisabledException e) {
            throw new RuntimeException("User is disabled", e);
        } catch (final BadCredentialsException e) {
            throw new RuntimeException("Invalid credentials", e);
        }
    }

    @GetMapping(value = "/api/v1/users/logout")
    public ResponseEntity<String> logOut(@RequestHeader(value = "Authorization") final String authorizationHeader) {
        jwtTokenUtil.extractTokenFromRequestTokenHeader(authorizationHeader);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
