package com.example.demo.repository;
import static com.example.demo.entity.QReview.review;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.domain.ReviewDTO;
import com.example.demo.entity.Review;
import com.querydsl.core.types.Projections;
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
	
//	@Override
//	public List<Review> selectList(String proId) {
//		return queryFactory.select(Projections.bean(
//				Review.class,
//				review.rev_id,
//				review.rev_title,
//				review.rev_com,
//				review.rev_rating,
//				review.rev_creat,
//				review.rev_answer,
//				review.rev_answer_creat
//				))
//				.from(review)
//				.where(review.product.pro_id.eq(proId))
//				.orderBy(review.rev_creat.desc())
//				.fetch();
//	}
	@Override
	public List<Review> selectList(String proId) {
		return queryFactory.selectFrom(review)
				.where(review.product.pro_id.eq(proId))
				.orderBy(review.rev_creat.desc())
				.fetch();
	}
	
	@Override
	public List<Review> selectList() {
		return queryFactory.selectFrom(review)
				.where(review.rev_answer_creat.isNull())
				.orderBy(review.rev_creat.asc())
				.fetch();	
		}
	
	@Override
	public void update(String rev_answer, Long rev_id, LocalDateTime localDateTime) {
		queryFactory.update(review)
		.set(review.rev_answer, rev_answer)
		.set(review.rev_answer_creat, localDateTime)
		.where(review.rev_id.eq(rev_id))
		.execute();
	}
	
	@Override
	public List<Review> booleanOne(String userId) {
		return queryFactory.selectFrom(review)
				.where(review.user.user_id.eq(userId))
				.fetch();
	}
	
//	@Override
//	public void reviewUpdate(Review review) {
//		 queryFactory.update(review)
//				.set(review.getRev_rating(), review.getRev_rating())
//				.set(review.revtitle)
//				.execute();
//	}
	@Override
	public void reviewUpdate(Review reviews) {
		queryFactory.update(review)
		.set(review.rev_rating, reviews.getRev_rating())
		.set(review.rev_title, reviews.getRev_title())
		.set(review.rev_com, reviews.getRev_com())
		.where(review.rev_id.eq(reviews.getRev_id()))
		.execute();
	}
	
	
	@Override
	public void reviewDelete(Review reviews) {
		queryFactory.delete(review)
		.where(review.rev_id.eq(reviews.getRev_id()))
//		.where(review.order.eq(reviews.getOrder()).and(review.product.eq(reviews.getProduct())))
		.execute();
	}

}
