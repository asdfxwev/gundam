package com.example.demo.repository;

import java.util.List;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.entity.Review;

public interface ReviewDSLRepository {
	
	List<String> searchOrderId(String userId, String proId);
	

}
