package com.example.demo.repository;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;

@Repository
public interface OrdersItemDSLRepository {
	
	List<String> searchOrderId(String proId);

}
