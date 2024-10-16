package com.example.demo.controller;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Orders;
import com.example.demo.service.CodeService;
import com.example.demo.service.OrdersService;
import com.example.demo.service.ProductService;
import com.querydsl.core.Tuple;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class AdminStatisticsController {

	private final OrdersService ordersService;

	private final CodeService coservice;

	@GetMapping("/statisticsList")
	public void statisticsList(Model model) {
		//브랜드 1/100
		model.addAttribute("codebrand", coservice.codeBrandOne());
		//건담, 포켓몬
		model.addAttribute("codecate", coservice.codeCateOne());
		//카테고리 건담무사
		model.addAttribute("codepiece", coservice.codePieceOne());
		System.out.println("orderList = "+ordersService.statisticList());
		model.addAttribute("orderList", ordersService.statisticList());

	}

	/*
	 * @PostMapping("/statisticsList") public void statisticsList(String startDate,
	 * String endDate, @RequestParam(required = false) List<String> pro_cate
	 * , @RequestParam(required = false)List<String>
	 * cate_brand, @RequestParam(required = false)List<String> cate_piece, Model
	 * model) { System.out.println("pro_cate = "+pro_cate);
	 * System.out.println("cate_brand = "+cate_brand);
	 * System.out.println("cate_piece = "+cate_piece);
	 * System.out.println("startDate = "+startDate);
	 * System.out.println("endDate = "+endDate);
	 * ordersService.statisticLists(startDate, endDate, pro_cate, cate_brand,
	 * cate_piece); //브랜드 1/100 model.addAttribute("codebrand",
	 * coservice.codeBrandOne()); //건담, 포켓몬 model.addAttribute("codecate",
	 * coservice.codeCateOne()); //카테고리 건담무사 model.addAttribute("codepiece",
	 * coservice.codePieceOne()); model.addAttribute("orderList",
	 * ordersService.statisticLists(startDate, endDate, pro_cate, cate_brand,
	 * cate_piece)); // return "redirect:/statistics/statisticsList";
	 * 
	 * }
	 */
	
	@PostMapping("/statisticsList")
	public void statisticsList(String startDate, String endDate, 
	    @RequestParam(required = false) List<String> pro_cate,
	    @RequestParam(required = false) List<String> cate_brand,
	    @RequestParam(required = false) List<String> cate_piece, Model model
	    ) {

	    ordersService.statisticLists(startDate, endDate, pro_cate, cate_brand, cate_piece);

	    // 검색 조건을 다시 model에 추가
	    model.addAttribute("selectedProCate", pro_cate);
	    model.addAttribute("selectedBrand", cate_brand);
	    model.addAttribute("selectedPiece", cate_piece);
	    model.addAttribute("startDate", startDate);
	    model.addAttribute("endDate", endDate);

	    model.addAttribute("codebrand", coservice.codeBrandOne());
	    model.addAttribute("codecate", coservice.codeCateOne());
	    model.addAttribute("codepiece", coservice.codePieceOne());
	    System.out.println("바보쏠"+ordersService.statisticLists(startDate, endDate, pro_cate, cate_brand, cate_piece));
	    model.addAttribute("orderList", ordersService.statisticLists(startDate, endDate, pro_cate, cate_brand, cate_piece));
	}
	
//	@GetMapping("/statisticsgender")
//	public void statisticsgender(@RequestParam String proId) {
//		System.out.println("proId = "+proId);
//	}



}
