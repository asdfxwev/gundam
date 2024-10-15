package com.example.demo.repository;

import static com.example.demo.entity.QOritems.oritems;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class OrdersItemDSLRepositoryImpl implements OrdersItemDSLRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<String> searchOrderId(String proId) {
        return queryFactory.select(oritems.order_id.order_id)
                .from(oritems)
                .where(oritems.pro_id.pro_id.eq(proId))
                .fetch();
    }
    }
