package com.example.demo.repository;

import com.example.demo.domain.OrderItemDTO;
import com.example.demo.entity.Oritems;
import com.example.demo.entity.OritemsId; // OritemsId 임포트 추가
import org.springframework.data.jpa.repository.JpaRepository;

public interface OritemsRepository extends JpaRepository<Oritems, OritemsId> {

	void save(OrderItemDTO item); 
	
}
