package com.example.demo.repository;

import java.util.List;

import com.example.demo.domain.ImgDTO;
import com.example.demo.domain.ProductDTO;
import com.example.demo.entity.Product;

public interface ProductDSLRespository {
	
	List<ImgDTO> joinDSL();
	
//	List<ImgDTO> joinDSLpage(int itemsPerPage, int currentPage, String inputValue, List<String> proCate);
//	List<ImgDTO> joinDSLpage(int itemsPerPage, int currentPage, String inputValue);
//	List<ImgDTO> joinDSLpage1(int itemsPerPage, int currentPage, String inputValue, List<String> cateBrand);
	List<ImgDTO> joinDSLpage(int itemsPerPage, int currentPage, String inputValue, List<String> cateBrand, List<String> proCate);
	
	
	
	Product selectOneDSL(String proId);
	
	Long update(Product productEntity, String proId);
	
	List<ImgDTO> searchList(String productname);
	
	Long countAllProduct(String inputValue);
}
