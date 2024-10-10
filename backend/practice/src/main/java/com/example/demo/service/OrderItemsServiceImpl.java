package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.OrdersDSLRepository;
import com.example.demo.repository.OrdersItemDSLRepository;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.ProductDSLRespository;
import com.example.demo.repository.ProductRepository;
import com.querydsl.jpa.impl.JPAQuery;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderItemsServiceImpl implements OrderItemsService {
	
    private final OrdersItemDSLRepository oriRepository;
	
	@Override
		public List<String> searchOrderId(String proId) {
			return oriRepository.searchOrderId(proId);
		}

}
