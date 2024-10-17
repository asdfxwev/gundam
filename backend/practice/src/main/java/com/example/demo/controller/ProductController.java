package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.ImgDTO;
import com.example.demo.domain.ReviewDTO;
import com.example.demo.domain.ReviewFirstDTO;
import com.example.demo.domain.ReviewModifyDTO;
import com.example.demo.domain.pageListDTO;
import com.example.demo.entity.Orders;
import com.example.demo.service.CodeService;
import com.example.demo.service.ImgService;
import com.example.demo.service.OrderItemsService;
import com.example.demo.service.OrdersService;
import com.example.demo.service.ProductService;
import com.example.demo.service.ProductServiceImpl;
import com.example.demo.service.ReviewService;
import com.querydsl.jpa.impl.JPAQuery;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/product")
@Log4j2
@AllArgsConstructor
public class ProductController {
	
	private final ProductService pservice;
	private final ImgService iservice;
	private final CodeService coservice;
	private final OrderItemsService oriservice;
	private final OrdersService orservice;
	private final ReviewService reservice;
	private final ProductServiceImpl poservice;
	
	@GetMapping("/productList")
	public ResponseEntity<?> productList(@RequestParam int itemsPerPage,
			@RequestParam int currentPage, @RequestParam String inputValue,
			@RequestParam(required = false, value = "proCate[]") List<String> proCate,
			@RequestParam(required = false, value = "cateBrand[]") List<String> cateBrand,
			@RequestParam(required = false, value = "catePiece[]") List<String> catePiece,
			@RequestParam(required = false, value = "proStateCd[]") List<String> proStateCd,
			@RequestParam(required = false) int price
			) {
		Map<String, Object> list = new HashMap< >();
		list.put("productList", pservice.joinDSLpage(itemsPerPage, currentPage, inputValue, proCate, cateBrand, catePiece, proStateCd, price));
		list.put("allproduct", poservice.countAllProduct(inputValue, proCate, cateBrand, catePiece, proStateCd, price));
		list.put("maxpage", poservice.countPerPage(itemsPerPage, inputValue, proCate, cateBrand, catePiece, proStateCd, price));
		list.put("brandList", coservice.codeBrandOne());
		list.put("cateList", coservice.codeCateOne());
		list.put("pieceList", coservice.codePieceOne());
		list.put("stateList", coservice.codeStateOne());
		//Map<String, Object> list = pservice.
		return ResponseEntity.ok(list);
	}

	
	@GetMapping("/productSearch")
	public ResponseEntity<?> productSearch(@RequestParam String productname) {
		System.out.println("productname = " +productname);
		List<ImgDTO> list = pservice.searchList(productname);
		System.out.println("searchList"+list);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/productDetail")
	public ResponseEntity<Map<String, ?>> productDetail(@RequestParam String proId) {
		Map<String, Object> list = new HashMap< >();
		list.put("imgList", iservice.imgList(proId));
		System.out.println("imgList"+iservice.imgList(proId));
		list.put("productList", pservice.selectOne(proId));
		System.out.println("productList"+pservice.selectOne(proId));
		list.put("reviewList", reservice.selectList(proId));
		System.out.println("reviewList"+reservice.selectList(proId));
//		Product product = pservice.selectOne(proId);
//		System.out.println("product = "+product);
		return ResponseEntity.ok(list);
	}
	
	
	
	
	@PostMapping("productReview")
	public ResponseEntity<?> productReview(@RequestBody ReviewDTO dto) {
		System.out.println(dto);
		reservice.save(dto);
		return ResponseEntity.ok("리뷰작성에 성공하였습니다");
	}
	
	@PostMapping("productReviewModify")
	public ResponseEntity<?> productReviewModify(@RequestBody ReviewModifyDTO dto) {
		System.out.println("dto = "+dto);
		reservice.reviewUpdate(dto);
		return ResponseEntity.ok("리뷰 수정에 성공하였습니다");
	}
	
	@PostMapping("productReviewDelete")
	public void productReviewDelete(@RequestBody ReviewDTO dto) {
		reservice.reviewDelete(dto);
	}

}
