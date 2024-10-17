package com.example.demo.repository;

import static com.example.demo.entity.QOrders.orders;
import static com.example.demo.entity.QUser.user;
import static com.example.demo.entity.QOritems.oritems;
import static com.example.demo.entity.QProduct.product;

import com.example.demo.domain.ImgDTO;
import com.example.demo.domain.OrderStatisticDTO;
import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.example.demo.entity.QOrders;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class OrdersDSLRepositoryImpl implements OrdersDSLRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Orders> findOrdersByDynamicCondition(String userId, String orderStatus) {
        QOrders orders = QOrders.orders;

        return queryFactory.selectFrom(orders)
                .where(
                    (userId != null) ? orders.user.user_id.eq(userId) : null,
                    (orderStatus != null) ? orders.order_status.eq(orderStatus) : null
                )
                .fetch();
    }
    
    @Override
    public List<String> searchOrderId(String userId) {
    	return queryFactory.select(orders.order_id)
    			.from(orders)
    			.where(orders.user.user_id.eq(userId))
    			.fetch();
    }
    @Override
    public List<Oritems> orderList(List<String> orderlist) {

    	
    	return queryFactory.selectFrom(oritems)
    			.where(oritems.order_id.order_id.in(orderlist))
    			.orderBy(oritems.order_id.order_date.desc())
    			.fetch();
    }
    
//    @Override
//    public List<Orders> orderList(String user_id) {
//    	return queryFactory.;
//    }
    
    @Override
    public List<Orders> findAllOrders() {
        return queryFactory.selectFrom(orders)
                .fetch(); // 모든 주문 조회
    }


    // 월별 통계 데이터를 가져오는 메서드
    public List<Tuple> findMonthlyOrderStats(String userId) {
        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);  // LocalDateTime으로 1년 전 시간 계산
        LocalDateTime now = LocalDateTime.now();  // 현재 시간 계산

        return queryFactory.select(orders.order_date.month(), orders.oritem_payment.sum())
                .from(orders)
                .where(orders.user.user_id.eq(userId)
                        .and(orders.order_date.goe(oneYearAgo))  // 1년 전 이상
                        .and(orders.order_date.loe(now)))       // 현재 시간 이하
                .groupBy(orders.order_date.month())
                .fetch();
    }
    
    @Override
    public List<Tuple> findGenderOrderStats(String userId) {
        return queryFactory.select(orders.user.gender, orders.oritem_payment.count())
                .from(orders)
                .where(orders.user.user_id.eq(userId))
                .groupBy(orders.user.gender)
                .fetch();
    }
    
    // 성별에 따라 받아오는거
    @Override
    public List<OrderStatisticDTO> statisticList(LocalDateTime startDateTime, LocalDateTime endDateTime) {
    	System.out.println("gdgd"+product.pro_id);
    	
    	return queryFactory.select(Projections.bean(OrderStatisticDTO.class,
    			product.pro_name.as("proName"),user.gender, oritems.oritem_quan.castToNum(Integer.class).sum().as("totalQuantity")))
    			.from(oritems)
    			.leftJoin(orders).on(orders.order_id.eq(oritems.order_id.order_id))
    			.leftJoin(product).on(product.pro_id.eq(oritems.pro_id.pro_id))
    			.leftJoin(user).on(user.user_id.eq(orders.user.user_id))
    			.where(orders.order_date.goe(startDateTime).and(orders.order_date.lt(endDateTime)))
    			.groupBy(product.pro_name, user.gender)
    			.orderBy(oritems.oritem_quan.castToNum(Integer.class).sum().desc())
    			.fetch();
    }
    

    
    @Override
    public List<OrderStatisticDTO> statisticSearchList(LocalDateTime startDateTime, LocalDateTime endDateTime,
    		List<String> pro_cate, List<String> cate_brand, List<String> cate_piece) {
    	
        BooleanBuilder builder = new BooleanBuilder();
        
        if (pro_cate != null && !pro_cate.isEmpty()) {
            builder.and(product.pro_cate.in(pro_cate));
        }

        // cateBrand 조건 추가
        if (cate_brand != null && !cate_brand.isEmpty()) {
            builder.and(product.cate_brand.in(cate_brand));
        }

        // cateBrand 조건 추가
        if (cate_piece != null && !cate_piece.isEmpty()) {
        	builder.and(product.cate_piece.in(cate_piece));
        }
        
		/*
		 * if (gender != null && !gender.isEmpty() ) { if ( gender.equals("남")) {
		 * builder.and(user.gender.eq("1").and(user.gender.eq("3"))); } else
		 * if(gender.equals("여")) {
		 * builder.and(user.gender.eq("2").and(user.gender.eq("4"))); } }
		 */
    	
    	return queryFactory.select(Projections.bean(OrderStatisticDTO.class,
    			product.pro_name.as("proName"),user.gender.as("gender"), oritems.oritem_quan.castToNum(Integer.class).sum().as("totalQuantity")))
    			.from(oritems)
    			.leftJoin(orders).on(orders.order_id.eq(oritems.order_id.order_id))
    			.leftJoin(product).on(product.pro_id.eq(oritems.pro_id.pro_id))
    			.leftJoin(user).on(user.user_id.eq(orders.user.user_id))
    			.where(orders.order_date.goe(startDateTime).and(orders.order_date.lt(endDateTime)).and(builder))
    			.groupBy(product.pro_name, user.gender)
    			.orderBy(oritems.oritem_quan.castToNum(Integer.class).sum().desc())
    			.fetch();
    }
    
}
