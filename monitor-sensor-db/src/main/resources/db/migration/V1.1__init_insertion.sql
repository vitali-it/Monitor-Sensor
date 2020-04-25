INSERT INTO monitor_sensor.USER_APP(login, password, created_date, updated_date, role) VALUES('admin', '$2a$10$WZvJKgDM9KSX2dr0MsQmMu4EpZsZKafBLNPpE.pwZz75TSTIiwfcS', '2020-04-22T21:01:28.392', '2020-04-22T21:01:28.392', 'ADMIN');
INSERT INTO monitor_sensor.USER_APP(login, password, created_date, updated_date) VALUES('user', '$2a$10$WZvJKgDM9KSX2dr0MsQmMu4EpZsZKafBLNPpE.pwZz75TSTIiwfcS', '2020-04-22T21:05:28.372', '2020-04-22T21:05:28.372');

INSERT INTO monitor_sensor.SENSOR_UNIT(sensor_type,	unit, range) VALUES('PRESSURE', 'bar', 15);
INSERT INTO monitor_sensor.SENSOR_UNIT(sensor_type,	unit, range) VALUES('VOLTAGE', 'voltage', 25);
INSERT INTO monitor_sensor.SENSOR_UNIT(sensor_type,	unit, range) VALUES('TEMPERATURE', '°C', 25);
INSERT INTO monitor_sensor.SENSOR_UNIT(sensor_type,	unit, range) VALUES('VOLTAGE', '%', 25);

INSERT INTO monitor_sensor.SENSOR(sensor_type_id, name, model, description, location, created_date, updated_date) 
			VALUES(1, 'Sens1', 'MDL1', 'description1', 'Minsk', '2020-04-25T01:05:56.956', '2020-04-25T01:05:57.443');
INSERT INTO monitor_sensor.SENSOR(sensor_type_id, name,	model, description, location, created_date, updated_date) 
			VALUES(2, 'Sens2', 'MDL2', 'description2', 'Paris', '2020-04-25T07:55:29.956', '2020-04-25T07:55:30.323');
INSERT INTO monitor_sensor.SENSOR(sensor_type_id, name,	model, description, location, created_date, updated_date) 
			VALUES(3, 'Sens3', 'MDL3', 'description3', 'London', '2020-04-25T15:43:29.432', '2020-04-25T15:43:30.433');
INSERT INTO monitor_sensor.SENSOR(sensor_type_id, name,	model, description, location, created_date, updated_date) 
			VALUES(4, 'Sens4', 'MDL4', 'description4', 'Montreal', '2020-04-25T20:55:40.554', '2020-04-25T20:55:41.432');
