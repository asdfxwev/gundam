package com.example.demo.service;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;

import java.util.List;
import java.util.Map;

public interface OrdersService {
    List<OrdersDTO> getOrders(String userId, String orderStatus);
    void createOrder(OrdersDTO orderDto);
    void updateOrder(String orderId, OrdersDTO orderDto);
    void deleteOrder(String orderId);
    
    List<String> searchOrderId(String userId);
    
    Map<String, Object> orderList(String userId);
}
