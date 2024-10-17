package com.example.demo.repository;

import java.util.List;
import static com.example.demo.entity.QUser.user;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserDSLRepositoryImpl implements UserDSLRepository {
	
    private final JPAQueryFactory queryFactory;
	
	
	@Override
		public List<User> findAllUsers() {
			// TODO Auto-generated method stub
			return queryFactory.select(Projections.bean(
					User.class,
					user.user_id))
					.from(user)
					.fetch();
		}
	
	

}
