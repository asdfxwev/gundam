package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.OritemsDTO;
import com.querydsl.jpa.impl.JPAQuery;

public interface OrderItemsService {
	void createOrderItem(OritemsDTO oritemsDto);

}
