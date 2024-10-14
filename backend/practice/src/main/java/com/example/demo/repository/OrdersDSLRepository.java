package com.example.demo.repository;

import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;

import java.util.List;

public interface OrdersDSLRepository {
    List<Orders> findOrdersByDynamicCondition(String userId, String orderStatus);
    List<String> searchOrderId(String userId);
    List<Oritems> orderList(List<String> orderlist);
}
