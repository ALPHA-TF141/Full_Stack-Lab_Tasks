package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

@ExtendWith(MockitoExtension.class)
class UserClientTest {

    @Mock
    private RestTemplate restTemplate;

    @Test
    void shouldFetchUsersFromIdentityServiceEndpoint() {
        when(restTemplate.getForObject("http://task18-identity-service/users", String.class))
            .thenReturn("User Service Working");

        UserClient userClient = new UserClient(restTemplate);

        String result = userClient.getUsers();

        assertEquals("User Service Working", result);
        verify(restTemplate).getForObject("http://task18-identity-service/users", String.class);
    }
}
