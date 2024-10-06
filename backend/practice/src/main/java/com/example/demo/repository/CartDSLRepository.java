package com.example.demo.repository;

import com.example.demo.entity.Cart;

import java.util.List;

public interface CartDSLRepository {
    List<Cart> findByUserId(String userId);
}
