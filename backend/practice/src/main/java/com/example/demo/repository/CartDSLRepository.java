package com.example.demo.repository;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;

import java.util.List;

public interface CartDSLRepository {
    List<CartDTO> findByUserId(String userId);
}
