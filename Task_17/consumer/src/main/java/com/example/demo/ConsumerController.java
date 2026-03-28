package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/consume")
public class ConsumerController {
	@Autowired
	private ConsumerService consumerService;

	public ConsumerService getConsumerService() {
		return consumerService;
	}

	public void setConsumerService(ConsumerService consumerService) {
		this.consumerService = consumerService;
	}
	
	
}
