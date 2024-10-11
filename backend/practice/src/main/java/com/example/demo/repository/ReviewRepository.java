package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	Review save(ReviewDTO dto);

//	Review save(ReviewDTO dto);

}
