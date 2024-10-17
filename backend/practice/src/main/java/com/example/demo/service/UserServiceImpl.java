package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	final private UserRepository urepository; 
	
	@Override
	public List<User> selectList() {
		return urepository.findAll();
	}
	
	@Override
	public User selectOne(String login_id) {
		return urepository.UserDetail(login_id);
	}

	@Override
	public User UserInfo(String user_id) {
		return urepository.UserInfo(user_id);
	}
	
	// user_id 찾기
	@Override
	public String getUserId(String login_id) {
		return urepository.UserId(login_id);
	}
	
	// ** insert, update
	@Override
	public User save(User entity) {
		// ㅣastcon_dtm 초기값 셋팅
		if (entity.getLastcon_dtm() == null) {
	        entity.setLastcon_dtm(LocalDateTime.now());
	    }
		
		// user_creat 초기값 셋팅
		if (entity.getUser_creat() == null) {
	        entity.setUser_creat(LocalDateTime.now());
	    }
		
		// user_cd 초기값 셋팅
		if (entity.getUser_cd() == null) {
	        entity.setUser_cd("uc02");
	    }
		
		// retry 초기값 셋팅
		if (entity.getRetry() == null) {
	        entity.setRetry(0);
	    }
		
		//입력받은 생년월일(yyyy-mm-dd)을 yymmdd형태로 저장
		//yymmdd 형태로 변환할 포맷터 정의
	    //DateTimeFormatter birth_format = DateTimeFormatter.ofPattern("yyMMdd");
	    
        //String birth = entity.getBirth();

		// String을 LocalDate로 변환
        //LocalDate birthDate = LocalDate.parse(birth);
		
        //entity.setBirth(birthDate.format(birth_format));
		
		return urepository.save(entity);
	}
	
	@Override
	public List<String> findAllUserId() {
		return urepository.findAllUserId();
	}
	
	@Override
	public void deleteByuser_id(String user_id) {
		urepository.deleteById(user_id);
	}
	
	// ** Password 수정 하기
	@Override
	public void updatePassword(String user_id, String password) {
		log.info("serviceImpl파일에 전달된 password값 => " + password);
		urepository.updatePassword(user_id, password);
	}
	
	@Override
	public User pwUserCheck(String login_id, String phone_num) {
		return urepository.pwUserCheck(login_id, phone_num);
	}

	@Override
	public String findloginid(String user_name, String phone_num) {
		return urepository.findloginid(user_name, phone_num);
	}
	
	@Override
	public List<UserDTO> findAllUsers() {
		return urepository.findAllUsers();
	}
	
	@Override
	public List<UserDTO> searchUsers(String inputValue) {
		return urepository.searchUsers(inputValue);
	}
	
}
