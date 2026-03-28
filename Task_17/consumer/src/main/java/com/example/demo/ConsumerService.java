package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConsumerService {
	@Autowired
	private RestTemplate restTemplate;
	
	private final String PRODUCER_URL = "http://localhost:8081/api/message";
	
	public String getMessageFromProducer() {
		try {
			return restTemplate.getForObject(PRODUCER_URL, String.class);
		}
		catch (Exception e){
			return "Fallback Response: Producer service is unavailable!";
		}
	}
	
	public String getErrorfromProducer() {
		try {
			return restTemplate.getForObject("http://localhost:8081/api/error", String.class);
		}
		catch (Exception e) {
			return "handled error: " + e.getMessage();
		}
	}
}
