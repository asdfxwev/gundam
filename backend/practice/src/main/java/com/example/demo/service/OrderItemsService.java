package com.example.demo.service;

import java.util.List;

import com.querydsl.jpa.impl.JPAQuery;

public interface OrderItemsService {
	
	List<String> searchOrderId(String proId);

}
