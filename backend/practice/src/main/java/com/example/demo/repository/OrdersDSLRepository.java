package com.example.demo.repository;

import com.example.demo.entity.Orders;
import java.util.List;

public interface OrdersDSLRepository {
    List<Orders> findOrdersByDynamicCondition(String userId, String orderStatus);
    
}
