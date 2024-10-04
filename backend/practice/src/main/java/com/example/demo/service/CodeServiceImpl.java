package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.Code;
import com.example.demo.entity.Product;
import com.example.demo.repository.CodeDSLRepository;
import com.example.demo.repository.CodeRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CodeServiceImpl implements CodeService {
	
	private final CodeRepository corepository;
	private final CodeDSLRepository codslrepository;

	@Override
	public List<Code> codeBrandOne() {
		return codslrepository.codeBrandOne();
	}
	
	@Override
	public List<Code> codeCateOne() {
		return codslrepository.codeCateOne();
	}
	@Override
	public List<Code> codePieceOne() {
		return codslrepository.codePieceOne();
	}
	@Override
	public List<Code> codeStateOne() {
		return codslrepository.codeStateOne();
	}

}
