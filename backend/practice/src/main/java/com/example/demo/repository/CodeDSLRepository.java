package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.Code;
import com.example.demo.entity.Product;

public interface CodeDSLRepository {
	
	List<Code> codeBrandOne();
	List<Code> codeCateOne();
	List<Code> codePieceOne();
	List<Code> codeStateOne();
	List<Code> findByCodeValue(String codeValue);

}
