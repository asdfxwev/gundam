package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.CartDSLRepository;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDSLRepository cartDSLRepository;

    @Override
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getCartItemsByUserId(String userId) {
        return cartDSLRepository.findByUserId(userId);
    }

    @Override
    public void removeCartItem(CartId cartId) {
        cartRepository.deleteById(cartId);
    }
}
