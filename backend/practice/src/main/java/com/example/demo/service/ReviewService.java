package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.domain.ReviewModifyDTO;
import com.example.demo.domain.reviewanswerDTO;
import com.example.demo.entity.Review;

public interface ReviewService {
	
	List<String> searchOrderId(String userId, String proId);
	
	Review save(ReviewDTO dto);
	
<<<<<<< Updated upstream
	void reviewUpdate(ReviewModifyDTO dto);
=======
	void reviewUpdate(ReviewDTO dto);
>>>>>>> Stashed changes
	
	List<Review> selectList(String proId);
	List<Review> selectList();
	
	void update(reviewanswerDTO dto);
	
	void reviewDelete(ReviewDTO dto);

}
