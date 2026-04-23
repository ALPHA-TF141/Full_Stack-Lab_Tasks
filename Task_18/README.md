# Task 18

Spring Boot microservices unit testing project.

Services:
- `task18-eureka-server`
- `task18-identity-service`
- `task18-order-service`
- `task18-payment-service`

Unit test coverage:
- controller tests with `MockMvc`
- service-layer tests with Mockito
- REST client/data-handling tests with mocked `RestTemplate`

Run tests inside each service:

```powershell
.\mvnw.cmd test
```
