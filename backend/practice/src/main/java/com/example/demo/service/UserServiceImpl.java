package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	final private UserRepository urepository; 
	
	@Override
	public List<User> selectList() {
		return urepository.findAll();
	}
	
//<<<<<<< HEAD
	@Override
	public User selectOne(String login_id) {
		return urepository.UserDetail(login_id);
	}
//=======
//	@Override
//	public User selectOne(String login_id) {
//		return urepository.findByLoginId(login_id);
//	}
//>>>>>>> sb
	
	// ** insert, update
	@Override
	public User save(User entity) {
		return urepository.save(entity);
	}
	
	@Override
	public void deleteById(String id) {
		urepository.deleteById(id);
	}
	
	// ** Password 수정 하기
	@Override
	public void updatePassword(String login_id, String password) {
		urepository.updatePassword(login_id, password);
	}

}
