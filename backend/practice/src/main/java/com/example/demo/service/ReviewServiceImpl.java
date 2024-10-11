package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.domain.reviewanswerDTO;
import com.example.demo.entity.Product;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.repository.ImgDSLRepository;
import com.example.demo.repository.ImgRepository;
import com.example.demo.repository.OrdersItemDSLRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ReviewDSLRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
	
	private final ReviewDSLRepository reDSLRepository;
	private final ReviewRepository reRepository;
    private final UserRepository userRepository;       // User 엔티티 조회를 위한 레포지토리
    private final ProductRepository productRepository;
	
	@Override
		public List<String> searchOrderId(String userId, String proId) {
			return reDSLRepository.searchOrderId(userId, proId);
		}
	
	@Override
	public Review save(ReviewDTO dto) {
        // 1. ReviewDTO를 Review 엔티티로 변환
        // DTO에서 필요한 필드를 추출하여 Review 엔티티를 생성
        User user = userRepository.findById(dto.getUser_id()).orElseThrow(() -> new IllegalArgumentException("Invalid user_id"));
        Product product = productRepository.findById(dto.getPro_id()).orElseThrow(() -> new IllegalArgumentException("Invalid pro_id"));
        
        Review review = Review.builder()
                .user(user)
                .product(product)
                .rev_rating(String.valueOf(dto.getRev_rating()))  // int 타입을 String으로 변환
                .rev_title(dto.getRev_title())
                .rev_com(dto.getRev_com())
                .rev_creat(LocalDateTime.now())  // 현재 시간으로 설정
                .build();
		return reRepository.save(review);
	}
	
	@Override
	public List<Review> selectList(String proId) {
		return reDSLRepository.selectList(proId);
	}
	
	@Override
	public List<Review> selectList() {
		return reDSLRepository.selectList();
	}
	
	@Override
	public void update(reviewanswerDTO dto) {
		
		
		reDSLRepository.update(dto.getRev_answer(), dto.getRev_id(), LocalDateTime.now());
	}

}
