package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Img;

public interface ImgRepository  extends JpaRepository<Img, Long> {
	
//	Img findByProNumAndProductId(Integer proNum, String pro_id);
	
	@Query("SELECT i.pro_num FROM Img i WHERE i.pro_id.pro_id=:proId")
	List<Integer> findAllProNum(String proId);

}
