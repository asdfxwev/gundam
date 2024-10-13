package com.example.demo.controller;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.service.OrdersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    private final OrdersService ordersService;

    @GetMapping
    public ResponseEntity<List<OrdersDTO>> getOrders(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String orderStatus) {
        List<OrdersDTO> orders = ordersService.getOrders(userId, orderStatus);
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrdersDTO orderDto) {
        // 주문 생성 시 입력 데이터 확인을 위한 로그 출력
        System.out.println("Creating order: " + orderDto);
        
        ordersService.createOrder(orderDto);
        return ResponseEntity.ok("Order created successfully");
    }
    @GetMapping("/status")
    public ResponseEntity<List<String>> getOrderStatus() {
        List<String> orderStatusCodes = ordersService.getOrderStatusCodes();
        System.out.println("orderstatuscode : "+orderStatusCodes);
        return ResponseEntity.ok(orderStatusCodes);
    }

}
