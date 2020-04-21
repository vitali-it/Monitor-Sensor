package com.monitor.sensor.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import com.monitor.sensor.entity.UserEntity;
import com.monitor.sensor.ui.User;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    
    UserEntity domainToEntity(User domain);
    
    User entityToDomain(UserEntity entity);
}
