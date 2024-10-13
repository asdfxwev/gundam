package com.example.demo.service;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Img;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Oritems;
import com.example.demo.entity.Review;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.ReviewDSLRepository;
import com.example.demo.repository.ImgDSLRepository;
import com.example.demo.repository.OrdersDSLRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepository ordersRepository;
    private final OrdersDSLRepository ordersDSLRepository;
    private final ImgDSLRepository imgDSLRepository;
    private final ReviewDSLRepository reDSLRepository;

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
    public Map<String, Object> orderList(String userId) {
    	
    	List<String> orderlist = ordersDSLRepository.searchOrderId(userId);
    	
    	List<Oritems> list = ordersDSLRepository.orderList(orderlist);
        // pro_id 추출
        List<String> proId = list.stream()
            .map(oritem -> oritem.getPro_id().getPro_id()) 
            .collect(Collectors.toList());
        
    	System.out.println(proId);
    	List<Img> imgList = imgDSLRepository.orderImgList(proId);
    	List<Review> reviewList = reDSLRepository.booleanOne(userId);
    	System.out.println("orderlist = "+list);
    	System.out.println("reviewlist = "+reviewList);
    	Map<String, Object> orderitems = new HashMap< >();
    	orderitems.put("orderList", list);
    	orderitems.put("imgList", imgList);
    	orderitems.put("reviewList", reviewList);
    	
    	return orderitems;
    }
    
    
    
    
    
    
    @Override
    public List<String> searchOrderId(String userId) {
    	
    	 return ordersDSLRepository.searchOrderId(userId);
    	
    	
    }
    
    
    
}
