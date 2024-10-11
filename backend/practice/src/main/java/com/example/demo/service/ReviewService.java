package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.domain.reviewanswerDTO;
import com.example.demo.entity.Review;

public interface ReviewService {
	
	List<String> searchOrderId(String userId, String proId);
	
	Review save(ReviewDTO dto);
	
	List<Review> selectList(String proId);
	List<Review> selectList();
	
	void update(reviewanswerDTO dto);

}
