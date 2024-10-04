package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Member;
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
	
	// ** User Detail
//	@GetMapping("/userDetail")
//	public ResponseEntity<?> userdetail(HttpSession session,
//										@AuthenticationPrincipal String login_id) {
//		
//		// => userID: 인증받은 token 에서 get (스프링이 @AuthenticationPrincipal 으로 제공해줌)
//        // => 요청 전달 : 스프링 시큐리티 필터 작동
//        //    -> JwtAuthenticationFilter 클래스의 doFilterInternal() 메서드가 호출되어
//        //    -> request 객체에서 token을 꺼내 분석하고, 인증되면
//        //    -> SecurityContext에 인증된 Authentication 객체를 넣어두고 
//        //       현재 스레드내에서 공유되도록 관리하고 있으며, 
//        //    -> @AuthenticationPrincipal 으로 이 정보를 제공해줌.
//		
//		//session.invalidate();
//		log.info("userdetail, 전달된 userId 확인 => "+login_id);
//		log.info("userdetail, session에 보관한 loginId 확인 => "+session.getAttribute("login_id"));
//		
//		Member entity = service.selectOne(login_id);
//		if( entity != null ) {
//			return ResponseEntity.ok(entity);
//		} else {
//			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
//					.body("userDetail failed.");
//		}
//		
//	} //userdetail
	
	
	
} //class
