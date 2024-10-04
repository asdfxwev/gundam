package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
	
    @Query("SELECT p.pro_id FROM Product p")
    List<String> findAllProIds();
    

}
