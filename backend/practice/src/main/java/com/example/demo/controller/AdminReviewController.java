package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.domain.reviewanswerDTO;
import com.example.demo.service.ReviewService;

import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/adminreview")
public class AdminReviewController {
	
	private final ReviewService reservice;
	
	@GetMapping("/reviewanswer")
	public void reviewanswer(Model model) {
		System.out.println(reservice.selectList());
		model.addAttribute("reviewList", reservice.selectList());
	}
	
	@Transactional
	@PostMapping("reviewanswer")
	public String reviewanswer(reviewanswerDTO dto) {
		System.out.println(dto);
		reservice.update(dto);
		
		return "redirect:/adminreview/reviewanswer";
	}
	

}
