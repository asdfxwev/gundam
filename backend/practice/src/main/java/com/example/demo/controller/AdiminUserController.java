package com.example.demo.controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.jwtToken.TokenProvider;
import com.example.demo.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping("/adminuser")
@AllArgsConstructor
//@RequiredArgsConstructor
public class AdiminUserController {
	
	private final UserService service;
	private final PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;
	
 	@GetMapping("/home")
 	public String userList(@RequestParam(required = false) String inputValue, Model model) {
 	    List<User> listResult;

 	    if (inputValue == null || inputValue.trim().isEmpty()) {
 	        listResult = service.findAllUsers(); // 모든 유저 데이터
 	        System.out.println("listResult = "+listResult);
 	    } else {
 	        listResult = service.searchUsers(inputValue); // 검색 결과
 	    }

 	    model.addAttribute("UserList", listResult);
 	    return "home";
 	}
 	
 	@PostMapping("/edit")
	public String editUser(@RequestParam("user_id") String user_id, 
						@RequestParam("user_cd") String user_cd, RedirectAttributes redirectAttributes) {
 		
 		try {
 			service.updateUserCd(user_id, user_cd);
 	        
 			redirectAttributes.addFlashAttribute("message", "권한 정보가 수정되었습니다.");
// 	        model.addAttribute("message", "사용자 정보가 성공적으로 수정되었습니다.");

 		} catch (Exception e) {
 	        
 	        redirectAttributes.addFlashAttribute("message", "권한 정보 수정중 오류가발생했습니다. 다시 시도해주세요.");
// 	        model.addAttribute("message", "사용자 정보 수정에 실패했습니다.");
 	    
 		}
 		
// 		return "/home";
 		return "redirect:/adminuser/home";
	}

}
