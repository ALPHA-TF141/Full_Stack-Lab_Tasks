package com.example.demo.exception;

public class ResourceNotFoundException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -2310134323828801169L;

	public ResourceNotFoundException(String message) {
        super(message);
    }
} 