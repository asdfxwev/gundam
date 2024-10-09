package com.example.demo.service;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Orders;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.OrdersDSLRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepository ordersRepository;
    private final OrdersDSLRepository ordersDSLRepository;

    @Override
    public List<OrdersDTO> getOrders(String userId, String orderStatus) {
        List<Orders> ordersList = ordersDSLRepository.findOrdersByDynamicCondition(userId, orderStatus);
        return ordersList.stream()
            .map(order -> new OrdersDTO(order.getOrder_id(), order.getUser().getUser_id(), order.getOrder_date(),
                order.getOrder_status(), order.getPostcode(), order.getOritem_address(),
                order.getOritem_dtladdress(), order.getOritem_name(), order.getOritem_number(),
                order.getPay_method(), order.getOritem_payment(), order.getOritem_count()))
            .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void createOrder(OrdersDTO orderDto) {
        Orders order = new Orders();
        ordersRepository.save(order);
    }

    @Transactional
    @Override
    public void updateOrder(String orderId, OrdersDTO orderDto) {
        Orders order = ordersRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        ordersRepository.save(order);
    }

    @Transactional
    @Override
    public void deleteOrder(String orderId) {
        ordersRepository.deleteById(orderId);
    }
    
    
    
    
    
    
    @Override
    public void searchOrderId(String loginId) {
    	
    	List<Orders> orderId = ordersRepository.searchOrderId(loginId);
    	
    	
    }
    
    
    
}
