package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, String> {
	
	// => JPQL 적용
	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.password = :password, u.retry = 0 WHERE u.user_id = :user_id")
	void updatePassword(@Param("user_id") String user_id, @Param("password") String password);
	
	// => NativeQuery 적용
	//@Modifying
	//@Transactional
	//@Query(nativeQuery = true, 
	//		value = "Update User set password=:password where login_id=:login_id")
	//void updatePassword2(@Param("login_id") String login_id, @Param("password") String password);
	
	// 로그인, ID중복체크
	@Query("SELECT u FROM User u WHERE u.login_id = :login_id")
    User UserDetail(@Param("login_id") String login_id);

	// user정보 select
	@Query("SELECT u FROM User u WHERE u.user_id = :user_id")
	User UserInfo(@Param("user_id") String user_id);
	
	// token 값으로 user_id get
	@Query("SELECT u.user_id FROM User u WHERE u.login_id = :login_id")
	String UserId(@Param("login_id") String login_id);
	
	// 회원가입시 user_id 값 순차증가를 위한 select
	@Query("SELECT u.user_id FROM User u")
    List<String> findAllUserId();
	
	// pw변경을 위한 입력정보 일치여부 확인
	@Query("SELECT u FROM User u WHERE u.login_id=:login_id AND u.phone_num=:phone_num")
	User pwUserCheck(@Param("login_id") String login_id, @Param("phone_num") String phone_num);
	
	// login_id 찾기
	@Query("SELECT u.login_id FROM User u WHERE u.user_name=:user_name AND u.phone_num=:phone_num")
	String findloginid(@Param("user_name") String user_name, @Param("phone_num") String phone_num);
}
