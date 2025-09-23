package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


// ** AuthController
// => JWT 인증 Test


@RestController
@RequestMapping("/auth")
@Log4j2
@AllArgsConstructor
public class AuthController {

	//MemberService service;
	UserService service;
	
	// ** 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session) {
		// => 세션무효화
		session.invalidate();
		log.info("로그아웃 성공");
		
		return ResponseEntity.ok("로그아웃 성공");
		
	} //logout
} //class
