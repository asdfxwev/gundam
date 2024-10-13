package com.example.demo.repository;

import static com.example.demo.entity.QCode.code;
import static com.example.demo.entity.QProduct.product;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.Code;
import com.example.demo.entity.Product;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CodeDSLRepositoryImpl implements CodeDSLRepository {
	
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Code> codeBrandOne() {
		return jpaQueryFactory.selectFrom(code)
							  .from(code)
							  .where(code.code_value.eq("cate_brand"))
							  .fetch();
	}
	
	@Override
	public List<Code> codeCateOne() {
		return jpaQueryFactory.selectFrom(code)
				.from(code)
				.where(code.code_value.eq("pro_cate"))
				.fetch();
	}
	
	@Override
	public List<Code> codePieceOne() {
		return jpaQueryFactory.selectFrom(code)
				.from(code)
				.where(code.code_value.eq("cate_piece"))
				.fetch();
	}
	
	@Override
	public List<Code> codeStateOne() {
		return jpaQueryFactory.selectFrom(code)
				.from(code)
				.where(code.code_value.eq("pro_state_cd"))
				.fetch();
	}

	@Override
	public List<Code> findByCodeValue(String codeValue) {
	    return jpaQueryFactory.selectFrom(code)
	        .where(code.code_value.eq(codeValue))
	        .fetch();
	}


}
