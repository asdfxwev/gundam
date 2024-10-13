package com.example.demo.controller;

import com.example.demo.domain.OritemsDTO;
import com.example.demo.service.OrderItemsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/oritems")
public class OrderItemsController {

    private final OrderItemsService orderItemsService;

    @PostMapping
    public ResponseEntity<String> createOrderItem(@RequestBody OritemsDTO oritemsDto) {
        System.out.println("Creating order item: " + oritemsDto);
        orderItemsService.createOrderItem(oritemsDto);
        return ResponseEntity.ok("Order item created successfully");
    }
}
