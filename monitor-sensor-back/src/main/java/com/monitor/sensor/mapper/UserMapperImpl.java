package com.monitor.sensor.mapper;

import com.monitor.sensor.entity.UserEntity;
import com.monitor.sensor.ui.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-01-05T02:03:05+0300",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 13.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserEntity domainToEntity(User domain) {
        if ( domain == null ) {
            return null;
        }

        UserEntity userEntity = new UserEntity();

        userEntity.setId( domain.getId() );
        userEntity.setLogin( domain.getLogin() );
        userEntity.setPassword( domain.getPassword() );
        userEntity.setRole( domain.getRole() );
        userEntity.setCreatedDate( domain.getCreatedDate() );
        userEntity.setUpdatedDate( domain.getUpdatedDate() );

        return userEntity;
    }

    @Override
    public User entityToDomain(UserEntity entity) {
        if ( entity == null ) {
            return null;
        }

        User user = new User();

        user.setId( entity.getId() );
        user.setLogin( entity.getLogin() );
        user.setPassword( entity.getPassword() );
        user.setRole( entity.getRole() );
        user.setCreatedDate( entity.getCreatedDate() );
        user.setUpdatedDate( entity.getUpdatedDate() );

        return user;
    }
}
