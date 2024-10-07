package com.example.demo.repository;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.repository.CartDSLRepository;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.example.demo.entity.QCart.cart;
import static com.example.demo.entity.QProduct.product;
import static com.example.demo.entity.QImg.img;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CartDSLRepositoryImpl implements CartDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;
//    @PersistenceContext
//    private EntityManager entityManager;

    @Override
    public List<CartDTO> findByUserId(String userId) {
//        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//        CriteriaQuery<Cart> query = cb.createQuery(Cart.class);
//        Root<Cart> cart = query.from(Cart.class);
//
//        query.select(cart).where(cb.equal(cart.get("user_id"), userId));
//
//        return entityManager.createQuery(query).getResultList();
//    	return jpaQueryFactory.selectFrom(cart)
//    			.where(cart.user_id.eq(userId))
//    			.fetch();
    	return jpaQueryFactory.select(Projections.bean(
    			CartDTO.class,
    			img.pro_imgs,
    			product.pro_name,
    			product.pro_id,
    			cart.cart_quantity,
    			product.pro_price,
    			cart.cart_quantity.multiply(product.pro_price).as("total_price")
    			))
    			.from(cart)
    			.leftJoin(product)
    			.on(product.pro_id.eq(cart.pro_id))
    			.leftJoin(img)
    			.on(img.pro_id.pro_id.eq(product.pro_id).and(img.pro_num.eq(0)))
    			.where(cart.user_id.eq(userId))
    			.fetch();
    }
}
