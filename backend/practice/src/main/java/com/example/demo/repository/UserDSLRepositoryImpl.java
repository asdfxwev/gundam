package com.example.demo.repository;

import static com.example.demo.entity.QCode.code;
import static com.example.demo.entity.QUser.user;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserDSLRepositoryImpl implements UserDSLRepository {
	
    private final JPAQueryFactory queryFactory;
	
	// 모든 사용자 데이터
    @Override
	public List<User> findAllUsers() {
		
		return queryFactory.select(Projections.bean(
				User.class,
				user.user_id,
				user.login_id,
				user.user_name,
				user.email,
				user.phone_num,
				user.user_cd,
				user.retry))
//				code.code_name.as("user_cd"))
				.from(user).leftJoin(code)
				.on(user.user_cd.eq(code.code_id))
				.fetch();
	}
	
    // 조건검색 사용자 데이터
    @Override
	public List<User> searchUsers(String inputValue) {
    	
    	BooleanBuilder builder = new BooleanBuilder();
		
		if (inputValue != null && !inputValue.isEmpty()) {
			builder.and(user.user_name.contains(inputValue))
					.or(user.login_id.contains(inputValue));
		}
		
		return queryFactory.select(Projections.bean(
				User.class,
				user.user_id,
				user.login_id,
				user.user_name,
				user.email,
				user.phone_num,
				user.user_cd,
				user.retry))
//				code.code_name.as("user_cd")))
				.from(user).leftJoin(code)
				.on(user.user_cd.eq(code.code_id))
				.where(user.user_name.contains(inputValue).or(user.login_id.contains(inputValue)))
				.fetch();
	}
    
    @Transactional
    @Override
    public void updateUserCd(String user_id, String user_cd) {
    	queryFactory.update(user)
    	.set(user.user_cd, user_cd)
    	.where(user.user_id.eq(user_id))
        .execute();
    }
	

}
