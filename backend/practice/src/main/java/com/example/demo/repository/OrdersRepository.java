package com.example.demo.repository;

import com.example.demo.entity.Orders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrdersRepository extends JpaRepository<Orders, String> {
	
	@Query("SELECT o.order_id FROM Orders o")
	List<String> findAllOrderIds();

}
