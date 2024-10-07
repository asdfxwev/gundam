package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;

public interface CartService {
    Cart addToCart(Cart cartdto);
    List<CartDTO> getCartItemsByUserId(String userId);
    void removeCartItem(CartId cartId);
    String getUserIdByLoginId(String loginId);
}
