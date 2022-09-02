package com.monitor.sensor.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import com.monitor.sensor.dao.UserRepo;
import com.monitor.sensor.entity.UserEntity;
import com.monitor.sensor.enums.UserRole;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final UserEntity user = userRepo.findByLogin(username).orElseThrow(() -> {
            final String message = String.format("%s is not found", username);
            log.error(message);
            throw new RuntimeException(message);
        });

        User.UserBuilder builder = User.builder().username(username);
        String password = user.getPassword();
        if (ObjectUtils.isEmpty(password)) {
            password = "";
        }

        builder.password(password);

        if (UserRole.ADMIN.equals(user.getRole())) {
            builder.roles("ADMIN");
        } else {
            builder.roles("VIEWER");
        }

        return builder.build();
    }

}
