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
        ordersService.createOrder(orderDto);
        return ResponseEntity.ok("Order created successfully");
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<String> updateOrder(@PathVariable String orderId, @RequestBody OrdersDTO orderDto) {
        ordersService.updateOrder(orderId, orderDto);
        return ResponseEntity.ok("Order updated successfully");
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable String orderId) {
        ordersService.deleteOrder(orderId);
        return ResponseEntity.ok("Order deleted successfully");
    }
}
