package com.example.demo.repository;

import static com.example.demo.entity.QProduct.product;
import static com.example.demo.entity.QCode.code;
import static com.example.demo.entity.QImg.img;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.CodeDTO;
import com.example.demo.domain.ImgDTO;
import com.example.demo.domain.ProductDTO;
import com.example.demo.entity.Img;
import com.example.demo.entity.Oritems;
import com.example.demo.entity.Product;
import com.example.demo.entity.QCode;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProductDSLRespositoryImpl implements ProductDSLRespository {
	
	private final JPAQueryFactory jpaQueryFactory;
	
	@Override
	public Page<ImgDTO> joinDSL(String inputValue, Pageable pageable){
		
		QCode code1 = new QCode("code1");  
		QCode code2 = new QCode("code2");  
		QCode code3 = new QCode("code3");  
		QCode code4 = new QCode("code4");
        BooleanBuilder builder = new BooleanBuilder();
        
        if (inputValue != null && !inputValue.isEmpty()) {
            builder.and(
                    product.pro_name.contains(inputValue)
                    .or(code1.code_name.contains(inputValue))
                        .or(code2.code_name.contains(inputValue))  
                        .or(code3.code_name.contains(inputValue))  
                        .or(code4.code_name.contains(inputValue)) 
                );		
            }
        
        long total = jpaQueryFactory
                .select(product.pro_id)
                .from(product)
                .leftJoin(code1).on(product.pro_cate.eq(code1.code_id))
                .leftJoin(code2).on(product.cate_brand.eq(code2.code_id))
                .leftJoin(code3).on(product.cate_piece.eq(code3.code_id))
                .leftJoin(code4).on(product.pro_state_cd.eq(code4.code_id))
                .leftJoin(img).on(product.pro_id.eq(img.pro_id.pro_id).and(img.pro_num.eq(0)))
                .where(builder)
                .fetchCount();  // 전체 데이터 수 조회
        
        List<ImgDTO> results = jpaQueryFactory.select(Projections.bean(
                ImgDTO.class,
                product.pro_id,
                product.pro_name,
                product.pro_des,
                product.pro_price,
                product.pro_stock,
                product.pro_creat,
                code1.code_name.as("pro_cate"),
                code2.code_name.as("cate_brand"),
                code3.code_name.as("cate_piece"),
                code4.code_name.as("pro_state_cd"),
                img.pro_imgs.as("pro_imgs")))
        		.from(product)
        		.leftJoin(code1).on(product.pro_cate.eq(code1.code_id))
        		.leftJoin(code2).on(product.cate_brand.eq(code2.code_id))
        		.leftJoin(code3).on(product.cate_piece.eq(code3.code_id))
        		.leftJoin(code4).on(product.pro_state_cd.eq(code4.code_id))
        		.leftJoin(img).on(product.pro_id.eq(img.pro_id.pro_id).and(img.pro_num.eq(0)))
        		.where(builder)
        		.fetchJoin()
        		.offset(pageable.getOffset())  // 조회 시작 위치 설정
        		.limit(pageable.getPageSize()) // 조회할 데이터 개수 설정
        		.fetch();

        	// 조회 결과를 PageImpl 객체로 반환하여 Page 형태로 리턴
        return new PageImpl<>(results, pageable, total);
		

	}
	
	@Override
	public Product selectOneDSL(String proId) {
		
		QCode code1 = new QCode("code1");  
		QCode code2 = new QCode("code2");  
		QCode code3 = new QCode("code3");  
		QCode code4 = new QCode("code4");
		

		return  jpaQueryFactory.select(Projections.bean(
				Product.class, 
				product.pro_id, 
				product.pro_name, 
				product.pro_des, 
				product.pro_price, 
				product.pro_stock,
				product.pro_creat,
				code1.code_name.as("pro_cate"),
				code2.code_name.as("cate_brand"), 
				code3.code_name.as("cate_piece"), 
				code4.code_name.as("pro_state_cd")))
				.from(product)
				.leftJoin(code1)
				.on(product.pro_cate.eq(code1.code_id))	
				.leftJoin(code2)
				.on(product.cate_brand.eq(code2.code_id))
				.leftJoin(code3)
				.on(product.cate_piece.eq(code3.code_id))
				.leftJoin(code4)
				.on(product.pro_state_cd.eq(code4.code_id))
				.where(product.pro_id.eq(proId))
				.fetchOne();
	}
	

	@Override
    public List<ImgDTO> joinDSLpage(int itemsPerPage, int currentPage, String inputValue, List<String> proCate, List<String> cateBrand, List<String> catePiece, List<String> proStateCd, int price) {
		
        QCode code1 = new QCode("code1");  
        QCode code2 = new QCode("code2");  
        QCode code3 = new QCode("code3");  
        QCode code4 = new QCode("code4");
        
        BooleanBuilder builder = new BooleanBuilder();
        
        
        if (inputValue != null && !inputValue.isEmpty()) {
            builder.and(product.pro_name.contains(inputValue)
                    .or(code1.code_name.contains(inputValue))
                    .or(code2.code_name.contains(inputValue))  
                    .or(code3.code_name.contains(inputValue))  
                    .or(code4.code_name.contains(inputValue)) );
        }
        
        // proCate 조건 추가
        if (proCate != null && !proCate.isEmpty()) {
            builder.and(product.pro_cate.in(proCate));
        }

        // cateBrand 조건 추가
        if (cateBrand != null && !cateBrand.isEmpty()) {
            builder.and(product.cate_brand.in(cateBrand));
        }

        // cateBrand 조건 추가
        if (catePiece != null && !catePiece.isEmpty()) {
        	builder.and(product.cate_piece.in(catePiece));
        }
        
        if (proStateCd != null && !proStateCd.isEmpty()) {
			builder.and(product.pro_state_cd.notIn(proStateCd));
		}
        
        if (price == 2) {
			builder.and(product.pro_price.lt(10000));
        }
        
        if (price == 3) {
			builder.and(product.pro_price.lt(50000).and(product.pro_price.goe(10000)));
		}
        
        if (price == 4) {
			builder.and(product.pro_price.lt(100000).and(product.pro_price.goe(50000)));
		}
        
        if (price == 5) {
			builder.and(product.pro_price.goe(100000));
		}
        
        return jpaQueryFactory.select(Projections.bean(
                ImgDTO.class, 
                product.pro_id, 
                product.pro_name, 
                product.pro_des, 
                product.pro_price, 
                product.pro_stock,
                product.pro_creat,
                code1.code_name.as("pro_cate"),
                code2.code_name.as("cate_brand"), 
                code3.code_name.as("cate_piece"), 
                code4.code_name.as("pro_state_cd"),
                img.pro_imgs.as("pro_imgs")))
            .from(product)
            .leftJoin(code1).on(product.pro_cate.eq(code1.code_id))
            .leftJoin(code2).on(product.cate_brand.eq(code2.code_id))
            .leftJoin(code3).on(product.cate_piece.eq(code3.code_id))
            .leftJoin(code4).on(product.pro_state_cd.eq(code4.code_id))
            .leftJoin(img).on(product.pro_id.eq(img.pro_id.pro_id).and(img.pro_num.eq(0)))
            .where(builder)
            .offset((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .fetchJoin()
            .fetch();
    }

	@Override
	public Long update(Product productEntity, String proId) {
		return jpaQueryFactory.update(product)
							  .set(product.pro_name, productEntity.getPro_name())
							  .set(product.pro_price, productEntity.getPro_price())
							  .set(product.pro_stock, productEntity.getPro_stock())
							  .set(product.pro_cate, productEntity.getPro_cate())
							  .set(product.cate_brand, productEntity.getCate_brand())
							  .set(product.cate_piece, productEntity.getCate_piece())
							  .set(product.pro_state_cd, productEntity.getPro_state_cd())
							  .where(product.pro_id.eq(proId))
							  .execute();
	}
	
	
	@Override
	public List<ImgDTO> searchList(String productname){
		
		QCode code1 = new QCode("code1");  
		QCode code2 = new QCode("code2");  
		QCode code3 = new QCode("code3");  
		QCode code4 = new QCode("code4");
		
		return jpaQueryFactory.select(Projections.bean(
									  ImgDTO.class, 
									  product.pro_id, 
									  product.pro_name, 
									  product.pro_des, 
									  product.pro_price, 
									  product.pro_stock,
									  product.pro_creat,
									  code1.code_name.as("pro_cate"),
									  code2.code_name.as("cate_brand"), 
									  code3.code_name.as("cate_piece"), 
									  code4.code_name.as("pro_state_cd"),
									  img.pro_imgs.as("pro_imgs")))
							  .from(product)
							  .leftJoin(code1)
							  .on(product.pro_cate.eq(code1.code_id))	
							  .leftJoin(code2)
							  .on(product.cate_brand.eq(code2.code_id))
							  .leftJoin(code3)
							  .on(product.cate_piece.eq(code3.code_id))
							  .leftJoin(code4)
							  .on(product.pro_state_cd.eq(code4.code_id))
							  .leftJoin(img)
							  .on(product.pro_id.eq(img.pro_id.pro_id).and(img.pro_num.eq(0)))
							  .where(product.pro_name.contains(productname).and(product.pro_name.contains(productname)))
							  .fetchJoin()
							  .fetch();
	}
	
	
	
	@Override
	public Long countAllProduct(String inputValue, List<String> proCate, List<String> cateBrand, List<String> catePiece, List<String> proStateCd, int price) {
		
		BooleanBuilder builder = new BooleanBuilder();
        
        // 검색어 조건 추가
        if (inputValue != null && !inputValue.isEmpty()) {
            builder.and(product.pro_name.contains(inputValue));
        }
        
        // proCate 조건 추가
        if (proCate != null && !proCate.isEmpty()) {
            builder.and(product.pro_cate.in(proCate));
        }

        // cateBrand 조건 추가
        if (cateBrand != null && !cateBrand.isEmpty()) {
            builder.and(product.cate_brand.in(cateBrand));
        }

        // cateBrand 조건 추가
        if (catePiece != null && !catePiece.isEmpty()) {
        	builder.and(product.cate_piece.in(catePiece));
        }
        
        if (proStateCd != null && !proStateCd.isEmpty()) {
			builder.and(product.pro_state_cd.notIn(proStateCd));
		}
        
        if (price == 2) {
			builder.and(product.pro_price.lt(10000));
        }
        
        if (price == 3) {
			builder.and(product.pro_price.lt(50000).and(product.pro_price.goe(10000)));
		}
        
        if (price == 4) {
			builder.and(product.pro_price.lt(100000).and(product.pro_price.goe(50000)));
		}
        
        if (price == 5) {
			builder.and(product.pro_price.goe(100000));
		}
		
	    return jpaQueryFactory
	            .select(product.count()) 
	            .from(product)
	            .where(builder)
	            .fetchOne();
	}
	
	
//	@Override
//	public void updateStock(Oritems oritems, int pro_stock) {
//		
//		if (product.pro_stock.subtract(Integer.parseInt(oritems.getOritem_quan())) == 0) {
//			jpaQueryFactory.update(product)
//			.set(product.pro_stock, product.pro_stock.subtract(Integer.parseInt(oritems.getOritem_quan())))
//			.set(product.pro_state_cd, "psc01")
//			.execute();
//		} else {
//			
//			jpaQueryFactory.update(product)
//			.set(product.pro_stock, product.pro_stock.subtract(Integer.parseInt(oritems.getOritem_quan())))
//			.execute();
//		}
//		
//	}
	
	@Override
	public void updateStock(Oritems oritems) {
	    // 주문 수량을 정수형으로 변환
	    int quantityToSubtract = Integer.parseInt(oritems.getOritem_quan());
	    System.out.println("productId1 = "+oritems.getPro_id());
	    System.out.println("productId2 = "+oritems.getPro_id().getPro_id());

	    // 새로운 재고 계산
	    NumberExpression<Integer> newStock = product.pro_stock.subtract(quantityToSubtract);

	    // 재고가 0 이하일 경우
	    if (newStock.equals(0)) { // newStock이 0보다 크거나 같을 때
	        jpaQueryFactory.update(product)
	        	.set(product.pro_stock, 0)
	        	.set(product.pro_state_cd, "psc01")
	        	.where(product.pro_id.eq(oritems.getPro_id().getPro_id()))
	            .execute();
	    } else {
	        jpaQueryFactory.update(product)
	            .set(product.pro_stock, newStock) 
	            .where(product.pro_id.eq(oritems.getPro_id().getPro_id()))
	            .execute();
	    }
	}

	
//	@Override
//	public int findbyproStock(String proId) {
//		return jpaQueryFactory.select(product.pro_stock)
//				.from(product)
//				.where(product.pro_id.eq(proId))
//				.fetchOne();
//	}

}
