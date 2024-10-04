package com.example.demo.repository;

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
	@Query("Update User u set u.password=:password where u.login_id=:login_id")
	void updatePassword(@Param("login_id") String login_id, @Param("password") String password);
	
	// => NativeQuery 적용
	//@Modifying
	//@Transactional
	//@Query(nativeQuery = true, 
	//		value = "Update User set password=:password where login_id=:login_id")
	//void updatePassword2(@Param("login_id") String login_id, @Param("password") String password);
	
//<<<<<<< HEAD
	@Query("select u from User u where u.login_id = :login_id")
    User UserDetail(@Param("login_id") String login_id);
//=======
//	@Query("select u from User u where u.login_id = :login_id")
//	User UserDetail(@Param("login_id") String login_id);
	
	//User findByLoginId(String login_id);
//>>>>>>> sb
}
