package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.entity.User;
import com.example.demo.repository.CartDSLRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.UserRepository;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDSLRepository cartDSLRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<CartDTO> getCartItemsByUserId(String userId) {
        return cartDSLRepository.findByUserId(userId);
    }

    public void removeCartItem(CartId cartId) {
        cartRepository.deleteById(cartId);
    }

    public String getUserIdByLoginId(String loginId) {
        User user = userRepository.UserDetail(loginId);
        return user != null ? user.getUser_id() : null;
    }

    public Cart updateCart(Cart cart) {
        Cart existingCart = cartRepository.findById(new CartId(cart.getUser_id(), cart.getPro_id())).orElse(null);
        if (existingCart != null) {
            existingCart.setCart_quantity(cart.getCart_quantity());
            return cartRepository.save(existingCart);
        } else {
            return cartRepository.save(cart);
        }
    }

    // 체크된 아이템을 구매하는 메서드
    public List<Cart> buyItems(List<CartDTO> cartDTOs) {
        List<Cart> boughtCarts = cartDTOs.stream()
                .map(cartDTO -> Cart.builder()
                        .user_id(cartDTO.getUser_id())
                        .pro_id(cartDTO.getPro_id())
                        .cart_quantity(cartDTO.getCart_quantity())
                        .build())
                .collect(Collectors.toList());

        return cartRepository.saveAll(boughtCarts); // 한번에 여러 아이템을 저장
    }
}
