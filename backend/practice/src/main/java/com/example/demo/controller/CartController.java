package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.service.CartService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartDTO cartdto) {
        Cart cart = Cart.builder()
                .user_id(cartdto.getUser_id())
                .pro_id(cartdto.getPro_id())
                .cart_quantity(cartdto.getCart_quantity())
                .build();
        
        Cart addedCart = cartService.addToCart(cart);
        return ResponseEntity.ok(addedCart);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getCartItems(@PathVariable String userId) {
        List<CartDTO> cartItems = cartService.getCartItemsByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeCartItem(new CartId(userId, productId));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/{productId}")
    public ResponseEntity<Cart> updateCart(@PathVariable String userId, 
                                           @PathVariable String productId, 
                                           @Valid @RequestBody CartDTO cartdto) {
        Cart cart = Cart.builder()
                .user_id(userId)
                .pro_id(productId)
                .cart_quantity(cartdto.getCart_quantity())
                .build();
        System.out.println("cart 확인 : "+cart);
        Cart updatedCart = cartService.updateCart(cart);
        System.out.println("updated cart 확인 : "+updatedCart);
        return ResponseEntity.ok(updatedCart);
    }
}
