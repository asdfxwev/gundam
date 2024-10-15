package com.example.demo.repository;

import static com.example.demo.entity.QImg.img;
import static com.example.demo.entity.QProduct.product;

import java.util.List;

import org.springframework.expression.spel.ast.Projection;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Img;
import com.example.demo.entity.QCode;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ImgDSLRepositoryImpl implements ImgDSLRepository {
	
	private final JPAQueryFactory jpaQueryFactory;
	
	@Override
	public List<Img> selectMainList() {
		return jpaQueryFactory.selectFrom(img)
							  .where(img.pro_num.eq(0))
							  .fetch();
	}
	
	@Override
	public List<Img> selectImg(String proId) {
	    return jpaQueryFactory.selectFrom(img)
	            .where(img.pro_id.pro_id.eq(proId))  // Product 객체 내의 pro_id를 참조하여 비교
	            .orderBy(img.pro_num.asc())  // pro_num 기준으로 오름차순 정렬
	            .fetch();  // 결과 리스트로 반환
	}
	
	@Override
	public Img imgNumZero(String proId) {
	    return jpaQueryFactory.select(Projections.bean(
	    		Img.class,
	    		img.img_id,
	    		img.pro_id,
	    		img.pro_imgs,
	    		img.pro_num))
	    		.from(img)
	            .where(img.pro_id.pro_id.eq(proId).and(img.pro_num.eq(0)))  
	            .orderBy(img.pro_num.asc())
	            .fetchOne();
	}
	
	@Override
	public List<Img> imgNumOne(String proId) {
		return jpaQueryFactory.selectFrom(img)
				.where(img.pro_id.pro_id.eq(proId)) 
				.orderBy(img.pro_num.asc())
				.fetch();
	}
	
	@Transactional
	@Override
	public void deleteProId(String proId) {
		jpaQueryFactory.delete(img)
					   .where(img.pro_id.pro_id.eq(proId))
					   .execute();
	}
	
	
	@Override
	public Img findByProImgs(String proImgs, String proId) {
		return jpaQueryFactory.selectFrom(img)
							  .where(img.pro_imgs.eq(proImgs).and(img.pro_id.pro_id.eq(proId)))
							  .fetchOne();
	}
	
	@Override
	public ImgDTO selectProduct(String proId) {
//		QCode code1 = new QCode("code1");  
//		QCode code2 = new QCode("code2");  
//		QCode code3 = new QCode("code3");  
//		QCode code4 = new QCode("code4");
//		
//
//		return  jpaQueryFactory.select(Projections.bean(
//				ImgDTO.class, 
//				product.pro_id, 
//				product.pro_name, 
//				product.pro_des, 
//				product.pro_price, 
//				product.pro_stock,
//				product.pro_creat,
//				code1.code_name.as("pro_cate"),
//				code2.code_name.as("cate_brand"), 
//				code3.code_name.as("cate_piece"), 
//				code4.code_name.as("pro_state_cd"),
//				img.pro_imgs.as("pro_imgs")))
//				.from(img)
//				.leftJoin(code1)
//				.on(product.pro_cate.eq(code1.code_id))	
//				.leftJoin(code2)
//				.on(product.cate_brand.eq(code2.code_id))
//				.leftJoin(code3)
//				.on(product.cate_piece.eq(code3.code_id))
//				.leftJoin(code4)
//				.on(product.pro_state_cd.eq(code4.code_id))
//				.leftJoin(img)
//				.on(product.pro_id.eq(img.pro_id.pro_id).and(img.pro_num.eq(0))) 
//				.where(product.pro_id.eq(proId))
//				.fetchOne();
		
		 QCode code1 = QCode.code;  
		    QCode code2 = new QCode("code2");
		    QCode code3 = new QCode("code3");
		    QCode code4 = new QCode("code4");
		    
		    return jpaQueryFactory
		            .select(Projections.constructor(
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
		                    img.pro_imgs.as("pro_imgs"),
		                    img.img_id, // img_id 추가
		                    img.pro_num // pro_num 추가
		            ))
		            .from(product)
		            .leftJoin(code1).on(product.pro_cate.eq(code1.code_id))
		            .leftJoin(code2).on(product.cate_brand.eq(code2.code_id))
		            .leftJoin(code3).on(product.cate_piece.eq(code3.code_id))
		            .leftJoin(code4).on(product.pro_state_cd.eq(code4.code_id))
		            .leftJoin(img).on(img.pro_id.pro_id.eq(product.pro_id).and(img.pro_num.eq(0)))
		            .where(product.pro_id.eq(proId))
		            .fetchOne();
	}
	
	
	@Override
	public List<Img> imgList(String proId) {
		return jpaQueryFactory.selectFrom(img)
				.where(img.pro_id.isNotNull().and(img.pro_id.pro_id.eq(proId))) 
				.orderBy(img.pro_num.asc())
				.fetch();
	}
	
	
	@Override
	public List<Img> orderImgList(List<String> proId) {
	    return jpaQueryFactory.selectFrom(img)
	            .where(img.pro_id.pro_id.in(proId).and(img.pro_num.eq(0)))  
	            .fetch();
	}
	
<<<<<<< Updated upstream
	@Override
	public void deleteImage(String pro_id, String pro_imgs) {
		jpaQueryFactory.delete(img)
		.where(img.pro_id.pro_id.eq(pro_id).and(img.pro_imgs.eq(pro_imgs)))
		.execute();
	}
	
	@Override
	public void updateImage(String pro_imgs, String pro_id, int pro_num) {
		jpaQueryFactory.update(img)
		.set(img.pro_num, pro_num)
		.where(img.pro_id.pro_id.eq(pro_id).and(img.pro_imgs.eq(pro_imgs)))
		.execute();
	}
	
=======
>>>>>>> Stashed changes
}
