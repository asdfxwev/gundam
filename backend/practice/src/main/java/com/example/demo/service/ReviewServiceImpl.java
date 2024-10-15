package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.domain.ReviewModifyDTO;
import com.example.demo.domain.reviewanswerDTO;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Product;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.repository.ImgDSLRepository;
import com.example.demo.repository.ImgRepository;
import com.example.demo.repository.OrdersItemDSLRepository;
import com.example.demo.repository.OrdersRepository;
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
    private final OrdersRepository orderRepository;
	
	@Override
		public List<String> searchOrderId(String userId, String proId) {
			return reDSLRepository.searchOrderId(userId, proId);
		}
	
	@Transactional
	@Override
	public Review save(ReviewDTO dto) {
        // 1. ReviewDTO를 Review 엔티티로 변환
        // DTO에서 필요한 필드를 추출하여 Review 엔티티를 생성
        User user = userRepository.findById(dto.getUser_id()).orElseThrow(() -> new IllegalArgumentException("Invalid user_id"));
        Product product = productRepository.findById(dto.getPro_id()).orElseThrow(() -> new IllegalArgumentException("Invalid pro_id"));
        Orders orders = orderRepository.findById(dto.getOrder_id()).orElseThrow(() -> new IllegalArgumentException("Invalid order_id"));
<<<<<<< Updated upstream
        System.out.println("orders : "+orders);
=======
>>>>>>> Stashed changes
        
        Review review = Review.builder()
                .user(user)
                .product(product)
                .rev_rating(String.valueOf(dto.getRev_rating()))  // int 타입을 String으로 변환
                .rev_title(dto.getRev_title())
                .rev_com(dto.getRev_com())
                .rev_creat(LocalDateTime.now())  // 현재 시간으로 설정
                .order(orders)
                .build();
<<<<<<< Updated upstream
        System.out.println("review : "+review);
=======
        
>>>>>>> Stashed changes
        System.out.println("gdgd"+reRepository.save(review));
        
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
	
	@Transactional
	@Override
	public void update(reviewanswerDTO dto) {
		
		
		reDSLRepository.update(dto.getRev_answer(), dto.getRev_id(), LocalDateTime.now());
	}
	
	@Override
	public void reviewUpdate(ReviewDTO dto) {
        // 1. ReviewDTO를 Review 엔티티로 변환
        // DTO에서 필요한 필드를 추출하여 Review 엔티티를 생성
        User user = userRepository.findById(dto.getUser_id()).orElseThrow(() -> new IllegalArgumentException("Invalid user_id"));
        Product product = productRepository.findById(dto.getPro_id()).orElseThrow(() -> new IllegalArgumentException("Invalid pro_id"));
        Orders orders = orderRepository.findById(dto.getOrder_id()).orElseThrow(() -> new IllegalArgumentException("Invalid order_id"));
        
        Review reviews = Review.builder()
                .user(user)
                .product(product)
                .rev_rating(String.valueOf(dto.getRev_rating()))  // int 타입을 String으로 변환
                .rev_title(dto.getRev_title())
                .rev_com(dto.getRev_com())
                .rev_creat(LocalDateTime.now())  // 현재 시간으로 설정
                .order(orders)
                .build();
        
        System.out.println("gdgd"+reRepository.save(reviews));
        
        reDSLRepository.reviewUpdate(reviews);
	}
	
	@Override
	public void reviewDelete(ReviewDTO dto) {
        Product product = productRepository.findById(dto.getPro_id()).orElseThrow(() -> new IllegalArgumentException("Invalid pro_id"));
        Orders orders = orderRepository.findById(dto.getOrder_id()).orElseThrow(() -> new IllegalArgumentException("Invalid order_id"));
        
        Review reviews = Review.builder()
                .product(product)
                .order(orders)
                .build();
        
        
        reDSLRepository.reviewDelete(reviews);
		
	}

	@Transactional
	@Override
	public void reviewUpdate(ReviewModifyDTO dto) {
        // 1. ReviewDTO를 Review 엔티티로 변환
        // DTO에서 필요한 필드를 추출하여 Review 엔티티를 생성
		System.out.println("dto = "+dto);
        User user = userRepository.findById(dto.getUser_id()).orElseThrow(() -> new IllegalArgumentException("Invalid user_id"));
        Product product = productRepository.findById(dto.getPro_id()).orElseThrow(() -> new IllegalArgumentException("Invalid pro_id"));
        Orders orders = orderRepository.findById(dto.getOrder_id()).orElseThrow(() -> new IllegalArgumentException("Invalid order_id"));
        
        Review reviews = Review.builder()
                .user(user)
                .rev_rating(String.valueOf(dto.getRev_rating()))  // int 타입을 String으로 변환
                .rev_title(dto.getRev_title())
                .rev_com(dto.getRev_com())
                .rev_creat(LocalDateTime.now())  // 현재 시간으로 설정
                .rev_id(dto.getRev_id())
                .order(orders)
                .product(product)
                .build();
        
        System.out.println("gdgd"+reRepository.save(reviews));
        
        reDSLRepository.reviewUpdate(reviews);
	}
	
	@Transactional
	@Override
	public void reviewDelete(ReviewDTO dto) {
		System.out.println("dto = " +dto);
//        Product product = productRepository.findById(dto.getPro_id()).orElseThrow(() -> new IllegalArgumentException("Invalid pro_id"));
//        Orders orders = orderRepository.findById(dto.getOrder_id()).orElseThrow(() -> new IllegalArgumentException("Invalid order_id"));
        Review reviews = Review.builder()
//                .product(product)
//                .order(orders)
        		.rev_id(dto.getRev_id())
                .build();
        
        
        reDSLRepository.reviewDelete(reviews);
		
	}

}
