package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/adminstatistics")
public class AdminStatisticsController {
	
	@GetMapping("/statisticsList")
	public void statisticsList(Model model) {
		
	}
}
