package com.monitor.sensor.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;

import com.github.javafaker.Faker;
import com.monitor.sensor.error.AuthorizationException;
import com.monitor.sensor.security.JwtRequest;
import com.monitor.sensor.security.JwtTokenUtil;
import com.monitor.sensor.security.JwtUserDetailsService;

@RunWith(MockitoJUnitRunner.class)
public class AuthControllerTest {

    private static final Faker FAKER = Faker.instance(Locale.ENGLISH, ThreadLocalRandom.current());

    @InjectMocks
    private AuthController controller;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenUtil jwtTokenUtil;

    @Mock
    private JwtUserDetailsService userDetailsService;

    @Test
    public void shouldCreateAuthToken() {
        Mockito.when(userDetailsService.loadUserByUsername(Mockito.anyString()))
                .thenReturn(Mockito.mock(UserDetails.class));
        authTokenCreation();

        Mockito.verify(authenticationManager, Mockito.times(1))
                .authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
        Mockito.verify(userDetailsService, Mockito.times(1)).loadUserByUsername(Mockito.anyString());
        Mockito.verify(jwtTokenUtil, Mockito.times(1)).generateToken(Mockito.any(UserDetails.class));

        Mockito.verifyNoMoreInteractions(authenticationManager);
        Mockito.verifyNoMoreInteractions(userDetailsService);
        Mockito.verifyNoMoreInteractions(jwtTokenUtil);

    }

    @Test(expected = AuthorizationException.class)
    public void shouldThrowExceptionWhileAuth() {
        Mockito.when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(DisabledException.class);
        authTokenCreation();
        Mockito.when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(BadCredentialsException.class);
        authTokenCreation();

    }

    @Test
    public void shouldLogOut() {
        ResponseEntity<String> result = controller.logOut(Mockito.anyString());
        Mockito.verify(jwtTokenUtil, Mockito.times(1)).extractTokenFromRequestTokenHeader(Mockito.anyString());
        assertEquals(ResponseEntity.status(HttpStatus.OK).build(), result);
    }

    private void authTokenCreation() {
        controller.createAuthenticationToken(fakeRequest());
    }

    private JwtRequest fakeRequest() {
        final JwtRequest request = new JwtRequest();

        request.setUsername(FAKER.lorem().fixedString(100));
        request.setPassword(FAKER.lorem().fixedString(20));
        return request;
    }
}
