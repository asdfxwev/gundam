package com.example.demo.repository;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.User;

import java.util.List;

public interface CartDSLRepository {
    List<CartDTO> findByUserId(String userId);
    User findUserByLoginId(String loginId);
<<<<<<< Updated upstream
    void deleteCart(Cart cart);
=======
>>>>>>> Stashed changes
}
