package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.example.demo.entity.User;

public interface UserService {
	
	// ** selectList
	List<User> selectList();
	
	// ** selectOne (로그인)
	public User selectOne(String login_id);

	// ** user_id 로 user정보 select
	public User UserInfo(String user_id);
	
	// ** get user_id
	String getUserId(String login_id);

	// ** insert, update
	User save(User entity);
	
	// ** user_id 시퀀스 증가를 위한 select
	List<String> findAllUserId();

	// ** delete
	void deleteByuser_id (String user_id);
	
	// ** Password 수정 하기
	void updatePassword(String user_id, String password);
	
	// ** Password 수정을 위한 정보 일치여부 확인
	public User pwUserCheck(String login_id, String phone_num);

}
