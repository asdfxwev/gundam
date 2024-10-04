package com.example.demo.repository;

import com.example.demo.entity.Orders;
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
}
