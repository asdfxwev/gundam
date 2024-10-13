package com.example.demo.service;

import com.example.demo.domain.OritemsDTO;
import com.example.demo.entity.Oritems;
import com.example.demo.entity.Orders; // Orders import
import com.example.demo.entity.Product; // Product import
import com.example.demo.repository.OritemsRepository;
import com.example.demo.repository.OrdersRepository; // OrdersRepository import
import com.example.demo.repository.ProductRepository; // ProductRepository import
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderItemsServiceImpl implements OrderItemsService {

    private final OritemsRepository oritemsRepository;
    private final OrdersRepository ordersRepository; // OrdersRepository 추가
    private final ProductRepository productRepository; // ProductRepository 추가

    @Override
    public void createOrderItem(OritemsDTO oritemsDto) {
        // Order ID로 Orders 엔티티 조회
        Orders order = ordersRepository.findById(oritemsDto.getOrder_id())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Product ID로 Product 엔티티 조회
        Product product = productRepository.findById(oritemsDto.getPro_id())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Oritems 객체 생성
        Oritems oritems = Oritems.builder()
                .order_id(order) // Orders 엔티티 할당
                .pro_id(product) // Product 엔티티 할당
                .oritem_quan(oritemsDto.getOritem_quan())
                .build();
                
        // 저장
        oritemsRepository.save(oritems);
    }
}
