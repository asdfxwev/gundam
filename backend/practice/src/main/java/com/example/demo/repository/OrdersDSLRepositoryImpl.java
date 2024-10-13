package com.example.demo.repository;

import static com.example.demo.entity.QOrders.orders;
import static com.example.demo.entity.QOritems.oritems;
import static com.example.demo.entity.QProduct.product;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.example.demo.entity.QOrders;
import lombok.RequiredArgsConstructor;
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
    
    
}
