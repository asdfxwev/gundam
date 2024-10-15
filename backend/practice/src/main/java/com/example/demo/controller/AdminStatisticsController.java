package com.example.demo.controller;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Orders;
import com.example.demo.service.OrdersService;
import com.example.demo.service.ProductService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class AdminStatisticsController {

	private final OrdersService ordersService;

	
	@GetMapping("/statisticsList")
	public void statisticsList(Model model) {

	}


}
