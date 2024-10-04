package com.example.demo.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequiredArgsConstructor
public class HomeController {

	private final ProductService pservice;
	private final UserService uservice;

	@RequestMapping({ "/home", "/" })
	public String home(Locale locale, Model model) {

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		model.addAttribute("serverTime", formattedDate);

		return "/home";
	} // home

	@GetMapping("/axtestform")
	public String axTestForm() {

		return "axTest/axTestForm";
	}

	
	@GetMapping("/productList")
	public String productList() {
		List<Product> list = pservice.selectList();
		for(Product p : list) {
			System.out.println(p);
		}
		return "redirect:/";
	}
	
	@GetMapping("/userList")
	public String userList() {
		List<User> list = uservice.selectList();
		for(User u:list) {
			System.out.println(u);
		}
		return "redirect:/";
	}

}