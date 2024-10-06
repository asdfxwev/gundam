package com.example.demo.repository;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId> {
	
}
