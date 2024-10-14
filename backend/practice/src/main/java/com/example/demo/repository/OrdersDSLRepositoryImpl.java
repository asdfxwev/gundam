package com.example.demo.repository;

import static com.example.demo.entity.QOrders.orders;

import com.example.demo.entity.Orders;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class OrdersDSLRepositoryImpl implements OrdersDSLRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Orders> findOrdersByDynamicCondition(String userId, String orderStatus) {
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
    public List<Orders> orderList(String userId) {
        return queryFactory.selectFrom(orders)
                .where(orders.user.user_id.eq(userId))
                .fetch();
    }

}
