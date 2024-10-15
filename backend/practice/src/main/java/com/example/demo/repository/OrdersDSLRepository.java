package com.example.demo.repository;

import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;
import com.querydsl.core.Tuple;

import java.util.List;

public interface OrdersDSLRepository {
    List<Orders> findOrdersByDynamicCondition(String userId, String orderStatus);
    List<String> searchOrderId(String userId);
    List<Oritems> orderList(List<String> orderlist);
	List<Tuple> findMonthlyOrderStats(String userId);
	List<Tuple> findGenderOrderStats(String userId);
	List<Orders> findAllOrders();
}
