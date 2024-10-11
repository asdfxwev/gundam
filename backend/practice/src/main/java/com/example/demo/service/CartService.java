package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.entity.User;

public interface CartService {
    // 기존 메서드
    Cart addToCart(Cart cart);
    List<CartDTO> getCartItemsByUserId(String userId);
    User getUserByLoginId(String loginId);
    void removeCartItem(CartId cartId);
    Cart updateCart(Cart cart);
    List<Cart> buyItems(List<CartDTO> cartDTOs);
}
