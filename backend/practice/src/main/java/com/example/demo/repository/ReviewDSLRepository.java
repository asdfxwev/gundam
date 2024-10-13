package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.entity.Review;

public interface ReviewDSLRepository {
	
	List<String> searchOrderId(String userId, String proId);
	
	List<Review> selectList(String proId);
	List<Review> selectList();

	void update(String rev_answer, Long rev_id, LocalDateTime localDateTime);
	
	List<Review> booleanOne(String userId);

	void reviewUpdate(Review reviews);
	
	void reviewDelete(Review reviews);
}
