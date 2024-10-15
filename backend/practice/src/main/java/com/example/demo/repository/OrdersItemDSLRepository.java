package com.example.demo.repository;

import java.util.List;
import com.example.demo.domain.OrderItemDTO;
import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;

@Repository
public interface OrdersItemDSLRepository {
	
	List<String> searchOrderId(String proId);
	List<OrderItemDTO> findItemsByOrderId(String orderId);
//	void insertOrderItems(OrderItemDTO dto);

}
