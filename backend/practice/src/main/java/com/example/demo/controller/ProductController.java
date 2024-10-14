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
	
	
	// 상품 구매한 것인지 확인하는거
	@PostMapping("productReviewId")
	public ResponseEntity<?> productReviewId(@RequestBody ReviewFirstDTO reviewdto) {
		System.out.println("userId = "+reviewdto.getUser_id());
		System.out.println("proId = "+reviewdto.getPro_id());
		String userId =  reviewdto.getUser_id();
		String proId = reviewdto.getPro_id();
		// 유저 아이디로 orderid찾기
		List<String> userorderId = orservice.searchOrderId(userId);
		System.out.println("userorderId = " +userorderId);
		// proid로 상품
		List<String> productOrderId = oriservice.searchOrderId(proId);
		System.out.println("productOrderId = " +productOrderId);
		
		// userId와 proId로 review에서 가져오기
		List<String> orderOrderId = reservice.searchOrderId(userId, proId);
		System.out.println("orderOrderId = " +orderOrderId);
		
		
		for(String uo : userorderId ) {
			System.out.println("uo = " +uo);
			for(String po : productOrderId) {
				System.out.println("po = " +po);
				System.out.println("a"+uo.equals(po));
				System.out.println("b"+orderOrderId.isEmpty());
				if (uo.equals(po) && orderOrderId.isEmpty()) {
					System.out.println(3);
					return ResponseEntity.ok(uo);
				}
				for(String oo : orderOrderId) {
					System.out.println("oo = " +oo);
					if ((uo.equals(po) && !uo.equals(oo) && !po.equals(oo)) || (uo.equals(po) && !uo.equals(oo) && !po.equals(oo) && oo.isEmpty())) {
						System.out.println(1);
						return ResponseEntity.ok(uo);
					}
				}

			}
		}
		System.out.println(2);
		return ResponseEntity.ok(false);
	}
	
	
	
	
	
	
	@PostMapping("productReview")
	public ResponseEntity<?> productReview(@RequestBody ReviewDTO dto) {
		System.out.println(dto);
		reservice.save(dto);
		return ResponseEntity.ok("리뷰작성에 성공하였습니다");
	}
	
	@PostMapping("productReviewModify")
	public void productReviewModify(@RequestBody ReviewModifyDTO dto) {
		System.out.println(dto);
		reservice.reviewUpdate(dto);
	}
	
	@PostMapping("productReviewDelete")
	public void productReviewDelete(@RequestBody ReviewDTO dto) {
		reservice.reviewDelete(dto);
	}

}
