package com.example.demo.service;


import java.util.List;
import java.util.Map;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Img;

import jakarta.servlet.http.HttpServletRequest;

public interface ImgService {
	
	Img save(Img imgEntity);
	
	List<Img> selectMainList();
	
	List<Img> selectOne(String proId);
	
	List<Img> imgNumOne(String proId);
	
	Img imgNumZero(String proId);
	
	void deleteProId(String proId);
	
	Img findByProImgs(String proImgs, String proId);

	//Img findByProNumAndProductId(Integer proNum, String pro_id);
	
	List<Integer> findAllProNum(String proId);
	
	ImgDTO selectProduct(String proId);
	
	List<Img> imgList(String proId);
	
	void deleteImagesByIds(List<Long> imgId, HttpServletRequest request, String proId);
	
	void deleteImage(Map<String, List<Map<String, String>>> requestData, HttpServletRequest request);
	
}
