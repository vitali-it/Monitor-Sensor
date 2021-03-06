package com.monitor.sensor.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.monitor.sensor.security.JwtEntryPoint;
import com.monitor.sensor.security.JwtTokenFilter;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtEntryPoint entryPoint;

    private final JwtTokenFilter jwtTokenFilter;

    private final UserDetailsService detailService;

    @Autowired
    @SneakyThrows
    public void configureGlobal(final AuthenticationManagerBuilder auth) {
        auth.userDetailsService(detailService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    @SneakyThrows
    public AuthenticationManager authenticationManagerBean() {
        return super.authenticationManagerBean();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH").allowedOrigins("*")
                        .allowedHeaders("*").allowCredentials(true);
            }
        };
    }

    @Override
    @SneakyThrows
    protected void configure(final HttpSecurity httpSecurity) {
        httpSecurity.cors().and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.POST, "/auth").permitAll()
                .antMatchers("**/actuator/**").permitAll().antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/swagger*/**").permitAll().antMatchers("/configuration/**").permitAll()
                .antMatchers("/webjars/**").permitAll().antMatchers(HttpMethod.POST, "**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "**").hasRole("ADMIN").antMatchers(HttpMethod.DELETE, "**")
                .hasRole("ADMIN").antMatchers(HttpMethod.PATCH, "**").hasRole("ADMIN").anyRequest().authenticated()
                .and().exceptionHandling().authenticationEntryPoint(entryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
