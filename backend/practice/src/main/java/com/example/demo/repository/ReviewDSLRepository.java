package com.example.demo.repository;

import java.util.List;

public interface ReviewDSLRepository {
	
	List<String> searchOrderId(String userId, String proId);

}
