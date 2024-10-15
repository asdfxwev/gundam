package com.example.demo.repository;

import com.example.demo.domain.OrderStatisticDTO;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;
import com.querydsl.core.Tuple;

import java.time.LocalDateTime;
import java.util.List;

public interface OrdersDSLRepository {
    List<Orders> findOrdersByDynamicCondition(String userId, String orderStatus);
    List<String> searchOrderId(String userId);
    List<Oritems> orderList(List<String> orderlist);
	List<Tuple> findMonthlyOrderStats(String userId);
	List<Tuple> findGenderOrderStats(String userId);
	List<Orders> findAllOrders();
	List<OrderStatisticDTO> statisticList(LocalDateTime startDateTime, LocalDateTime endDateTime);
	List<OrderStatisticDTO> statisticSearchList(LocalDateTime startDateTime, LocalDateTime endDateTime, List<String>pro_cate, List<String>cate_brand, List<String>cate_piece);
}
