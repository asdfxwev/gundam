package com.example.demo.repository;

import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;
<<<<<<< Updated upstream
import com.querydsl.core.Tuple;
=======
>>>>>>> Stashed changes

import java.util.List;

public interface OrdersDSLRepository {
    List<Orders> findOrdersByDynamicCondition(String userId, String orderStatus);
    List<String> searchOrderId(String userId);
<<<<<<< Updated upstream
    List<Oritems> orderList(List<String> orderlist);
	List<Tuple> findMonthlyOrderStats(String userId);
	List<Tuple> findGenderOrderStats(String userId);
	List<Orders> findAllOrders();
=======
    
    
    List<Oritems> orderList(List<String> orderlist);
>>>>>>> Stashed changes
}
