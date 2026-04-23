# Task 18 - Microservice Unit Testing

This task contains a Spring Boot Maven project built to demonstrate independent testing of:

- Service logic using `JUnit 5` and `Mockito`
- REST controller endpoints using `MockMvc`
- Data handling using `@DataJpaTest` with the in-memory `H2` database

## Project Structure

- `src/main/java` - application source code
- `src/test/java` - unit and slice test cases
- `pom.xml` - Maven dependencies required for Eclipse import and execution

## Libraries Used

- `spring-boot-starter-web`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-validation`
- `spring-boot-starter-test`
- `h2`

## How To Run In Eclipse

1. Open Eclipse.
2. Select `File -> Import -> Existing Maven Projects`.
3. Choose the `Task_18` folder.
4. Wait for Maven dependencies to download and the project to build.
5. Run `Task18MicroserviceApplication.java` as `Spring Boot App` or `Java Application`.
6. Run the test classes from `src/test/java` using `Run As -> JUnit Test`.

## Available REST Endpoints

- `GET /api/inventory`
- `GET /api/inventory/{id}`
- `GET /api/inventory?category=Electronics`
- `POST /api/inventory`
- `PATCH /api/inventory/{id}/quantity?quantity=10`
- `DELETE /api/inventory/{id}`
