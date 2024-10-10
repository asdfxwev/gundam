package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;

public interface CartService {
    // 기존 메서드
    Cart addToCart(Cart cart);
    List<CartDTO> getCartItemsByUserId(String userId);
    void removeCartItem(CartId cartId);
    String getUserIdByLoginId(String loginId);    
    Cart updateCart(Cart cart);
    
    // 수정된 buyItems 메서드
    List<Cart> buyItems(List<CartDTO> cartDTOs);
}
