# Monitor-Sensor
Consists of 3 applications

## Requirements 
Java 17 (JDK) or above<br>
Node.js lts<br>
Postgresql<br>

### How to launch the db scripts
Open `monitor-sensor-db` maven app<br>
1. Flyway may be used:<br>
Run mvn `mvn flyway:migrate` <br>
Run mvn `mvn flyway:clean` may also be executed if we intend to reset the db progress<br>
2. If you cannot handle Flyway, just run the scripts in a regular way<br>
Run `mvn clean package spring-boot:run`

### How to launch the server-side app
Open `monitor-sensor-back` gradle app<br>
Build the project by means of gradle<br>
Launch the project. Remember since Spring Boot is applied,<br>
you do not have to use an external tomcat.<br>
Variables for connecting to the db may be found within `application.yml`<br>
Swagger documentation can be reached via `http://localhost:8088/swagger-ui.html#`

### How to launch the client-side app
Open `monitor-sensor-front` app<br>
First of all, you are required to install all the dependencies, `npm i` can be used for this<br>
In order to run the application, use `ng serve -o`<br>
For the same with Hot Module Replacement, use `ng serve -hmr`<br>
In order to execute its tests, use `ng test`<br>
In order to apply linter, use `npx ng lint --fix`<br>
