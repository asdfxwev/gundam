package com.example.demo.repository;

import java.util.List;

import com.querydsl.jpa.impl.JPAQuery;

public interface OrdersItemDSLRepository {
	
	List<String> searchOrderId(String proId);

}
