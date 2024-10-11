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
import com.example.demo.entity.User;
import com.example.demo.service.CartService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // 상품을 카트에 추가하는 메서드
    @PostMapping
    public ResponseEntity<Cart> addToCart(@Valid @RequestBody CartDTO cartdto) {
        Cart cart = Cart.builder()
                .user_id(cartdto.getUser_id())
                .pro_id(cartdto.getPro_id())
                .cart_quantity(cartdto.getCart_quantity())
                .build();
        
        Cart addedCart = cartService.addToCart(cart);
        return ResponseEntity.ok(addedCart);
    }

    // 사용자 ID로 카트 아이템을 가져오는 메서드
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getCartItems(@PathVariable String userId) {
        List<CartDTO> cartItems = cartService.getCartItemsByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }

    // 특정 상품을 카트에서 제거하는 메서드
    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeCartItem(new CartId(userId, productId));
        return ResponseEntity.noContent().build();
    }

    // 카트 아이템을 업데이트하는 메서드
    @PutMapping("/{userId}/{productId}")
    public ResponseEntity<Cart> updateCart(@PathVariable String userId, 
                                           @PathVariable String productId, 
                                           @Valid @RequestBody CartDTO cartdto) {
        Cart cart = Cart.builder()
                .user_id(userId)
                .pro_id(productId)
                .cart_quantity(cartdto.getCart_quantity())
                .build();

        Cart updatedCart = cartService.updateCart(cart);
        return ResponseEntity.ok(updatedCart);
    }

    // 체크된 아이템을 구매하는 메서드
    @PostMapping("/buy")
    public ResponseEntity<List<Cart>> buyItems(@Valid @RequestBody List<CartDTO> cartDTOs) {
        List<Cart> boughtCarts = cartService.buyItems(cartDTOs);
        return ResponseEntity.ok(boughtCarts);
    }
    
    @GetMapping("/user/{loginId}")
    public ResponseEntity<User> getUserByLoginId(@PathVariable String loginId) {
        User user = cartService.getUserByLoginId(loginId);
        
        if (user != null) {
            // 콘솔에 사용자 정보를 출력합니다.
            System.out.println("User ID: " + user.getUser_id());
            System.out.println("User Name: " + user.getUser_name());
            System.out.println("User Email: " + user.getEmail());
            System.out.println("User Address: " + user.getAddress());
            System.out.println("User phone_num: " + user.getPhone_num());
            // 필요한 다른 필드들도 출력할 수 있습니다.
        } else {
            System.out.println("User not found for loginId: " + loginId);
        }

        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

}
