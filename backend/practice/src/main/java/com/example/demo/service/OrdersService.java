package com.example.demo.service;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Orders;

import java.util.List;

public interface OrdersService {
    List<OrdersDTO> getOrders(String userId, String orderStatus);
    void createOrder(OrdersDTO orderDto);    
    List<String> searchOrderId(String userId);
    List<String> getOrderStatusCodes();
}
