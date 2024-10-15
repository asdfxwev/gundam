package com.example.demo.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderRequestDTO {
    private OrdersDTO orderDto;
    private List<OrderItemDTO> orderItems;

    // Getters and setters
}
