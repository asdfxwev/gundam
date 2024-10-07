package com.example.demo.controller;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartDTO cartDTO) {
        System.out.println("Received CartDTO: " + cartDTO); // 추가된 로그

        // 로그인된 사용자 ID가 null인지 체크
        String userId = cartDTO.getUser_id(); // 프론트엔드에서 전송된 user_id
        System.out.println("Received user ID: " + userId);

        if (userId == null) {
            return ResponseEntity.badRequest().body("로그인 정보가 없습니다."); // 로그인 정보가 없음
        }

        // Product 조회
        Product product = productService.selectOne(cartDTO.getPro_id());
        if (product == null) {
            return ResponseEntity.badRequest().body("상품이 존재하지 않음."); // 상품 존재하지 않음
        }

        // Cart 객체 생성
        Cart cart = Cart.builder()
                .userId(userId) // 프론트엔드에서 전송된 user_id 사용
                .proId(cartDTO.getPro_id()) // pro_id
                .cartQuantity(cartDTO.getCart_quantity()) // cart_quantity
                .build();

        // 장바구니 추가
        Cart addedCart = cartService.addToCart(cart);
        return ResponseEntity.ok(addedCart); // 추가된 장바구니 반환
    }

    
    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCartItems(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartItemsByUserId(userId)); // 사용자 ID로 장바구니 항목 조회
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeCartItem(new CartId(userId, productId)); // 장바구니 항목 삭제
        return ResponseEntity.noContent().build(); // 삭제 후 No Content 반환
    }
}
