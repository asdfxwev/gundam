package com.example.demo.repository;

import java.util.List;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Product;

public interface ProductDSLRespository {
	
	List<ImgDTO> joinDSL(String inputValue);
	
	List<ImgDTO> joinDSLpage(int itemsPerPage, int currentPage, String inputValue, List<String> proCate, List<String> cateBrand, List<String> catePiece, List<String> proStateCd, int price);
	
	
	
	Product selectOneDSL(String proId);
	
	Long update(Product productEntity, String proId);
	
	List<ImgDTO> searchList(String productname);
	
	Long countAllProduct(String inputValue, List<String> proCate, List<String> cateBrand, List<String> catePiece, List<String> proStateCd, int price);
}
