package com.example.demo.repository;

import com.example.demo.domain.CartDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.User;  // User 엔티티 추가
import com.example.demo.entity.QCart;
import com.example.demo.entity.QProduct;
import com.example.demo.entity.QImg;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.demo.entity.QCart.cart;
import static com.example.demo.entity.QProduct.product;
import static com.example.demo.entity.QImg.img;
import static com.example.demo.entity.QUser.user;  // QUser 추가

@Repository
@RequiredArgsConstructor
public class CartDSLRepositoryImpl implements CartDSLRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<CartDTO> findByUserId(String userId) {
        return jpaQueryFactory.select(Projections.bean(
                CartDTO.class,
                img.pro_imgs,
                product.pro_name,
                product.pro_id,
                cart.cart_quantity,
                product.pro_price,
                cart.cart_quantity.multiply(product.pro_price).as("total_price"),
                user.user_id,          // user_id 추가
                user.user_name,        // user_name 추가
                user.email             // email 추가
                ))
                .from(cart)
                .leftJoin(product)
                .on(product.pro_id.eq(cart.pro_id))
                .leftJoin(img)
                .on(img.pro_id.pro_id.eq(product.pro_id).and(img.pro_num.eq(0)))
                .leftJoin(user)         // user 테이블과 조인
                .on(user.user_id.eq(cart.user_id)) // user_id 기준으로 조인
                .where(cart.user_id.eq(userId))
                .fetch();
    }


    // userId와 같은 login_id를 가진 User 엔티티를 조회하는 메서드
    public User findUserByLoginId(String loginId) {
        return jpaQueryFactory.selectFrom(user)
                .where(user.user_id.eq(loginId)) 
                .fetchOne();
    }
}
