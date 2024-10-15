package com.example.demo.controller;

import com.example.demo.domain.ImgDTO;
import com.example.demo.domain.OrdersDTO;
import com.example.demo.domain.UserDTO;
import com.example.demo.service.OrdersService;
import com.example.demo.service.ProductService;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrdersController {

    private final OrdersService ordersService;
	private final ProductService pservice;
    

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
        System.out.println("orderstatuscode : " + orderStatusCodes);
        return ResponseEntity.ok(orderStatusCodes);
    }

    @PostMapping("/orderList")
    public ResponseEntity<?> orderList(@RequestBody UserDTO dto) {
        Map<String, Object> list = ordersService.orderList(dto.getUser_id());
        System.out.println(list);
        return ResponseEntity.ok(list);
    }

    // 월별 통계 엔드포인트
    @GetMapping("/monthly_stats")
    public ResponseEntity<Map<Integer, Double>> getMonthlyOrderStats(@RequestParam String userId) {
        Map<Integer, Double> monthlyStats = ordersService.getMonthlyOrderStats(userId);
        return ResponseEntity.ok(monthlyStats); 
    }

    // 성별 통계 엔드포인트
    @GetMapping("/gender_stats")
    public ResponseEntity<Map<String, Long>> getGenderStats(@RequestParam String userId) {
        Map<String, Long> genderStats = ordersService.getGenderOrderStats(userId);
        return ResponseEntity.ok(genderStats); 
    }

    // JSP 페이지를 위한 통계 페이지 메서드
    @GetMapping("/statistics")
    public ResponseEntity<?> getStatisticsPage(Model model) {
        List<OrdersDTO> orders = ordersService.getAllOrders();
        model.addAttribute("orders", orders);
        return ResponseEntity.ok(orders); 
    }
    
}
