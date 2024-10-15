package com.example.demo.repository;

import static com.example.demo.entity.QOrders.orders;
import static com.example.demo.entity.QOritems.oritems;
import static com.example.demo.entity.QProduct.product;

import com.example.demo.domain.ImgDTO;
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
    
}
