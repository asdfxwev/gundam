package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

import jakarta.validation.Valid;

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
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartDTO cartdto) {
        System.out.println("Received CartDTO: " + cartdto); 

//        // 로그인된 사용자 ID가 null인지 체크
//        String userId = cart.getUser_id(); 
//        System.out.println("Received user ID: " + userId);
//
//        if (userId == null) {
//            return ResponseEntity.badRequest().body("로그인 정보가 없습니다."); 
//        }
//
//        // Product 조회
//        Product product = productService.selectOne(cart.getPro_id());
//        if (product == null) {
//            return ResponseEntity.badRequest().body("상품이 존재하지 않음."); 
//        }
        
        // 어차피 로그인 되어야 되고, product 있어야 되는거. 굳이 필요하지 않다. 2번 작업할 이유가 없다.
//
//        // Cart 객체 생성
        Cart cart = Cart.builder()
                .user_id(cartdto.getUser_id()) 
                .pro_id(cartdto.getPro_id()) 
                .cart_quantity(cartdto.getCart_quantity()) 
                // update 해야함. 같은 값이 있으면 +1 되어야 하기 때문에
                .build();
        
        // 장바구니 추가
        Cart addedCart = cartService.addToCart(cart);
        return ResponseEntity.ok(addedCart); 
    }
        // 사용자 ID로 장바구니 항목 조회
        @GetMapping("/{userId}")
        public ResponseEntity<List<CartDTO>> getCartItems(@PathVariable String userId) {
            System.out.println("Received request for userId: " + userId);
            System.out.println("Received request for cartItems: " + cartService.getCartItemsByUserId(userId));
            
            List<CartDTO> cartItems = cartService.getCartItemsByUserId(userId);
            
            System.out.println("조회된 장바구니 항목: " + cartItems);
            
            return ResponseEntity.ok(cartItems); 
        }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeCartItem(new CartId(userId, productId)); 
        return ResponseEntity.noContent().build(); 
    }
}
