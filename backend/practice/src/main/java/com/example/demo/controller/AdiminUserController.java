package com.example.demo.controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.User;
import com.example.demo.jwtToken.TokenProvider;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping("/user")
//@AllArgsConstructor
@RequiredArgsConstructor
public class AdiminUserController {
	
	private final UserService service;
	private final PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;
	
 	@GetMapping("/home")
 	public String userList(@RequestParam(required = false) String inputValue, Model model) {
// 	    List<UserDTO> listResult;
 	    List<User> listResult;

// 	    listResult = service.findAllUsers(inputValue); // 모든 유저 데이터
// 	    System.out.println("listResult = "+listResult);
 	    if (inputValue == null || inputValue.trim().isEmpty()) {
 	        listResult = service.findAllUsers(); // 모든 유저 데이터
 	        System.out.println("listResult = "+listResult);
 	    } else {
 	        listResult = service.searchUsers(inputValue); // 검색 결과
 	    }

 	    model.addAttribute("UserList", listResult);
 	    return "redirect:/home";
 	}

}
