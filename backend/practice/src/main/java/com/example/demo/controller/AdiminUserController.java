package com.example.demo.controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.jwtToken.TokenProvider;
import com.example.demo.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping
@AllArgsConstructor
public class AdiminUserController {
	
	private final UserService service;
	private final PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;
	
 	@GetMapping
 	public String userList(@RequestParam(required = false) String inputValue, Model model) {
// 	    List<UserDTO> listResult;
 	    List<User> listResult;

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
