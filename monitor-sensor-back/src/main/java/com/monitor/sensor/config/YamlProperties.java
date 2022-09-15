package com.monitor.sensor.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.monitor.sensor.config.model.Element;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties
@PropertySource(value = "classpath:properties.yml", factory = YamlPropertySourceFactory.class)
@Setter
@Getter
public class YamlProperties {

    private Element element;

}
