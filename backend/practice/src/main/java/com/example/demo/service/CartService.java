package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import java.util.List;

public interface CartService {
    Cart addToCart(Cart cart);
    List<Cart> getCartItemsByUserId(String userId);
    void removeCartItem(CartId cartId);
    String getUserIdByLoginId(String loginId);
}
