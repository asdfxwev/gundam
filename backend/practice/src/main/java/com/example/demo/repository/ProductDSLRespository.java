package com.example.demo.repository;

import java.util.List;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Oritems;
import com.example.demo.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductDSLRespository {
	
	Page<ImgDTO> joinDSL(String inputValue, Pageable pageable);
	
	List<ImgDTO> joinDSLpage(int itemsPerPage, int currentPage, String inputValue, List<String> proCate, List<String> cateBrand, List<String> catePiece, List<String> proStateCd, int price);
	
	
	
	Product selectOneDSL(String proId);
	
	Long update(Product productEntity, String proId);
	
	List<ImgDTO> searchList(String productname);
	
	Long countAllProduct(String inputValue, List<String> proCate, List<String> cateBrand, List<String> catePiece, List<String> proStateCd, int price);
	
	void updateStock(Oritems oritems);
	
//	int findbyproStock(String proId);
	
	
}
