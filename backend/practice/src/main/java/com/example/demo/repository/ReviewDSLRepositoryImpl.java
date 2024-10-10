package com.example.demo.repository;
import static com.example.demo.entity.QReview.review;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.entity.Review;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReviewDSLRepositoryImpl implements ReviewDSLRepository {
	
    private final JPAQueryFactory queryFactory;
	
	@Override
		public List<String> searchOrderId(String userId, String proId) {
			return queryFactory.select(review.order.order_id)
					.from(review)
					.where(review.user.user_id.eq(userId).and(review.product.pro_id.eq(proId)))
					.fetch();
		}
	
	


}
