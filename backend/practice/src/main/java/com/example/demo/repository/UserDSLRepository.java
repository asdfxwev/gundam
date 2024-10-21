package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;

public interface UserDSLRepository {
	
	List<User> findAllUsers();

	List<User> searchUsers(String inputValue);
	
	void updateUserCd(String user_id, String user_cd); 

}
