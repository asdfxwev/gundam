package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;

public interface UserService {
	
	// ** selectList
	List<User> selectList();
	
	// ** selectOne (로그인)
	public User selectOne(String login_id);

	// ** insert, update
	User save(User entity);
	
	List<String> findAllUserId();

	// ** delete
	void deleteById (String id);
	
	// ** Password 수정 하기
	void updatePassword(String id, String password);
}
