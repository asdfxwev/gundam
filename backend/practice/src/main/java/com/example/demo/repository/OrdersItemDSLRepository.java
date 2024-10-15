package com.example.demo.repository;

import java.util.List;
import com.example.demo.domain.OrderItemDTO;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersItemDSLRepository {
	
	List<String> searchOrderId(String proId);
	
//	void insertOrderItems(OrderItemDTO dto);

}
