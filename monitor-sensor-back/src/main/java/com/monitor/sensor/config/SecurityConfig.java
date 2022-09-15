package com.monitor.sensor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.monitor.sensor.enums.UserRole;
import com.monitor.sensor.security.JwtEntryPoint;
import com.monitor.sensor.security.JwtTokenFilter;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtEntryPoint jwtEntryPoint;

    private final JwtTokenFilter jwtTokenFilter;

    private final UserDetailsService jwtUserDetailsService;

    private final static String[] ANT_PATTERNS = { "/actuator/**", "/v3/**", "/swagger*/**", "/configuration/**",
            "/webjars/**" };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("*");
            }
        };
    }

    @Bean
    @SneakyThrows
    public AuthenticationManager authManager(HttpSecurity httpSecurity, UserDetailsService userDetailService) {
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder()).and().build();
    }

    @Bean
    @SneakyThrows
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) {
        httpSecurity.cors().and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.POST, "/auth").permitAll()
                .antMatchers(ANT_PATTERNS).permitAll().antMatchers(HttpMethod.POST, "**").hasRole(UserRole.ADMIN.name())
                .antMatchers(HttpMethod.PUT, "**").hasRole(UserRole.ADMIN.name()).antMatchers(HttpMethod.DELETE, "**")
                .hasRole(UserRole.ADMIN.name()).antMatchers(HttpMethod.PATCH, "**").hasRole(UserRole.ADMIN.name())
                .anyRequest().authenticated().and().exceptionHandling().authenticationEntryPoint(jwtEntryPoint).and()
                .httpBasic().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
