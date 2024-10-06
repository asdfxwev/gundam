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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Cart> addToCart(@Valid @RequestBody CartDTO cartDTO) {
        // 사용자 조회
        User user = userService.selectOne(cartDTO.getUser_id());
        if (user == null) {
            System.out.println("사용자가 존재하지 않음: " + cartDTO.getUser_id());
            return ResponseEntity.badRequest().body(null); // 사용자 존재하지 않음
        }
        
        // 상품 조회
        Product product = productService.selectOne(cartDTO.getPro_id());
        if (product == null) {
            System.out.println("상품이 존재하지 않음: " + cartDTO.getPro_id());
            return ResponseEntity.badRequest().body(null); // 상품 존재하지 않음
        }

        // Cart 객체 생성
        Cart cart = Cart.builder()
                .user_id(user)
                .pro_id(product)
                .cart_quantity(cartDTO.getCart_quantity())
                .build();

        // 장바구니에 추가
        Cart addedCart = cartService.addToCart(cart);
        return ResponseEntity.ok(addedCart); // 추가된 카트 객체 반환
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCartItems(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartItemsByUserId(userId));
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeCartItem(new CartId(userId, productId));
        return ResponseEntity.noContent().build();
    }
}
