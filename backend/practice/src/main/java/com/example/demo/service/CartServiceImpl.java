package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.CartDSLRepository;
import com.example.demo.repository.UserRepository; // UserRepository 추가
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDSLRepository cartDSLRepository;

    @Autowired
    private UserRepository userRepository; // UserRepository 주입

    @Override
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);  // 장바구니에 추가
    }

    @Override
    public List<Cart> getCartItemsByUserId(String userId) {
        return cartDSLRepository.findByUserId(userId);  // 사용자 ID로 장바구니 항목 조회
    }

    @Override
    public void removeCartItem(CartId cartId) {
        cartRepository.deleteById(cartId);  // 장바구니 항목 삭제
    }

    @Override
    public String getUserIdByLoginId(String loginId) {
        User user = userRepository.UserDetail(loginId); // login_id로 User 가져오기
        return user != null ? user.getUser_id() : null; // 사용자 ID 반환
    }
}
