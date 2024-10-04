package com.example.demo.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class AaaaaController {
	
	private final UserService uservice;
	
	@GetMapping("/userList")
	public void userList(Model model) {
		List<User> list = uservice.selectList();
		model.addAttribute("userList", uservice.selectList());
		System.out.println(uservice.selectList());
	}
}
