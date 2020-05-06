DROP TABLE IF EXISTS monitor_sensor.SENSOR_UNIT CASCADE;
CREATE TABLE monitor_sensor.SENSOR_UNIT (
	id SERIAL PRIMARY KEY,
	sensor_type SENSOR_TYPE,
	unit VARCHAR(16),
	range_begin INT,
	range_end INT
);

DROP TABLE IF EXISTS monitor_sensor.SENSOR CASCADE;
CREATE TABLE monitor_sensor.SENSOR (
	id SERIAL PRIMARY KEY,
	sensor_type_id INT REFERENCES monitor_sensor.SENSOR_UNIT, 
	name VARCHAR(32) UNIQUE,
	model VARCHAR(16),
	description VARCHAR(256),
	location VARCHAR(128),
	created_date TIMESTAMP,
	updated_date TIMESTAMP
);
