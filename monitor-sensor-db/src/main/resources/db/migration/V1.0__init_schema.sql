DROP SCHEMA IF EXISTS monitor_sensor CASCADE;
CREATE SCHEMA monitor_sensor;

DROP TYPE IF EXISTS ROLE CASCADE;
CREATE TYPE ROLE AS ENUM (
    'ADMIN', 'VIEWER'
);

DROP TYPE IF EXISTS SENSOR_TYPE CASCADE;
CREATE TYPE SENSOR_TYPE AS ENUM (
    'PRESSURE', 'VOLTAGE', 'TEMPERATURE', 'HUMIDITY'
);

DROP TABLE IF EXISTS monitor_sensor.USER_APP CASCADE;
CREATE TABLE monitor_sensor.USER_APP (
	id SERIAL PRIMARY KEY,
	login VARCHAR(32) UNIQUE,
	password VARCHAR(68),
	role ROLE default 'VIEWER',
	created_date TIMESTAMP,
	updated_date TIMESTAMP
);

DROP TABLE IF EXISTS monitor_sensor.SENSOR_UNIT CASCADE;
CREATE TABLE monitor_sensor.SENSOR_UNIT (
	id SERIAL PRIMARY KEY,
	sensor_type SENSOR_TYPE,
	unit VARCHAR(16),
	range INT
);

DROP TABLE IF EXISTS monitor_sensor.SENSOR CASCADE;
CREATE TABLE monitor_sensor.SENSOR (
	id SERIAL PRIMARY KEY,
	sensor_type_id INT REFERENCES monitor_sensor.SENSOR_UNIT, 
	name VARCHAR(32) UNIQUE,
	model VARCHAR(16) UNIQUE,
	description VARCHAR(256),
	location VARCHAR(128),
	created_date TIMESTAMP,
	updated_date TIMESTAMP
);
