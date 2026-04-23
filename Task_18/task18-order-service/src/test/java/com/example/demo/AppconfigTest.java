package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestTemplate;

class AppconfigTest {

    @Test
    void shouldCreateRestTemplateBean() {
        Appconfig appconfig = new Appconfig();

        RestTemplate restTemplate = appconfig.restTemplate();

        assertNotNull(restTemplate);
    }
}
