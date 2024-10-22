package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.domain.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.jwtToken.TokenProvider;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Log4j2
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	
	private final UserService service;
	private final PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;

	// ** 로그인 확인 
    // => Session 체크해서 react state값 유지
    // => Session 객체는 각 User별로 관리됨 
    @GetMapping("/check-server")
    public ResponseEntity<?> checkLogin(HttpSession session) {
        log.info("** React_SpringBoot Connection 확인 중 **");
        return ResponseEntity.ok()
                .body(Map.of("checkLogin", "Login_확인하지않음",
                             "checkData", "** Port:8080 **"     
                        ));
        // => Map.of()
        //    - java 9 버전 부터 추가, 간편하게 초기화 가능
        //      map.put(1, "sangwoo kang"); map.put(2, "james kang"); put(3, "stef you");
        //      -> Map.of(key_1, "Value_sangwoo kang",
        //                2, "james kang",
        //                3, "stef you" )
        //    - 그러나 10개 까지만 초기화 가능 (10개 이상은 ofEntries() 사용)
        //    - unmodifiable(수정불가능) map을 리턴하므로 초기화후 수정불가능 (Immutable 객체)
        //    - 초기화 이후에 조회만 하는경우 주로사용함.(Key 관리 등)
    }
    
    // token 값으로 user_id return
    @PostMapping("/token_info")
	public String getUserId(@RequestHeader("Authorization") String token) {
    	log.info("전달된 토큰 값 ==>> "+token);
        String login_id = tokenProvider.validateAndGetUserId(token.substring(7));
        
        return service.getUserId(login_id);
    }
//     token 값을 받아서 login_id return 받고 selectOne으로 정보를 가져와서 보냄
//    @PostMapping("/token_info")
//	public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
//    	log.info("전달된 토큰 값 ==>> "+token);
//    	
//        String login_id = tokenProvider.validateAndGetUserId(token.substring(7));
//        //String login_id = tokenProvider.validateAndGetUserId(token);
//        
//        log.info("토큰으로 꺼내온 login_id 값 ==>> "+login_id);
//        
//        User entity = service.selectOne(login_id);
//        
//        if( entity != null ) {
//        	
//        	UserDTO userDTO = UserDTO.builder()
//    				.token(token)
//		    		.user_id(entity.getUser_id())
//					.login_id(entity.getLogin_id())
//					.user_name(entity.getUser_name())
//					.user_cd(entity.getUser_cd())
//					.build();
//        	
// 			return ResponseEntity.ok(userDTO);
// 			
// 		} else {
// 			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
// 					.body("사용자 정보를 찾을수없습니다.");
// 		}
//    }
    
    
    // user_id로 user정보 return
    @PostMapping("/user_info")
	public ResponseEntity<?> UserInfo(@RequestBody User entity) {
    	log.info("전달된 user_id 값 ==>> "+entity.getUser_id());
        entity = service.UserInfo(entity.getUser_id());
      
        if( entity != null ) {
      	
//      	UserDTO userDTO = UserDTO.builder()
//      			.user_id(entity.getUser_id())
//				.login_id(entity.getLogin_id())
//				.user_name(entity.getUser_name())
//				.email(entity.getEmail())
//				.birth(entity.getBirth())
//				.gender(entity.getGender())
//				.phone_num(entity.getPhone_num())
//				.postcode(entity.getPostcode())
//				.address(entity.getAddress())
//				.dtl_address(entity.getDtl_address())
//				.user_cd(entity.getUser_cd())
//				.build();
      	
//			return ResponseEntity.ok(userDTO);
			return ResponseEntity.ok(entity);
			
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
					.body("사용자 정보를 찾을수없습니다.");
		}
    }
    
    // ** Login : token 발행
    @PostMapping("/login")
    // 전달된 값이 id가 같다면 자동으로 담아주지만 전달된 데이터는 json형태이기때문에 
    // @RequestBody 로 타이블 맞춰줘야 데이터가 들어옴
    public ResponseEntity<?> login(@RequestBody User entity, HttpSession session, Model model) {
    	// 1) 요청 분석
    	String password = entity.getPassword();
    	
    	// 2) Service 처리 & 결과 전송
    	entity = service.selectOne(entity.getLogin_id());
    	
    	int logintry = entity.getRetry();
    	
    	if( entity != null && passwordEncoder.matches(password, entity.getPassword()) && logintry < 5 ) {
    		// => 성공 : token 생성 & 로그인 정보 session 에 보관 & Front로 전송
    		session.setAttribute("login_Id", entity.getLogin_id());
    		session.setAttribute("login_Name", entity.getUser_name());
    		
    		// => token 생성
    		final String token = tokenProvider.create(entity.getLogin_id());
    		
    		// => token parser 확인
    		log.info("Login: token parser 확인 => " + tokenProvider.validateAndGetUserId(token));
    		
    		// => 전송할 UserDTO 객체생성
    		//	  빌더패턴, 값변경을 예방을위해 final
    		final UserDTO userDTO = UserDTO.builder()
    				.token(token)
		    		.user_id(entity.getUser_id())
					.login_id(entity.getLogin_id())
					.user_name(entity.getUser_name())
					.user_cd(entity.getUser_cd())
					.build();
    		
    		entity.setRetry(0);
    		entity.setLastcon_dtm(LocalDateTime.now());
    		service.save(entity);
    		
    		log.info("로그인 성공 => " + HttpStatus.OK);
//    		return ResponseEntity.ok(userDTO);
    		return ResponseEntity.ok(token);	// 세션스토리지에서 토큰만 사용할때
    		
    		
    	} else if(entity != null && passwordEncoder.matches(password, entity.getPassword()) && logintry >= 5) {
    		log.error("로그인 실패 => " + HttpStatus.TOO_MANY_REQUESTS);
    		return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("** 로그인 시도 횟수가 초과됐습니다. 비밀번호 변경 후 다시 로그인하세요.");		// TOO_MANY_REQUESTS = 429
    	} else if(entity != null && !passwordEncoder.matches(password, entity.getPassword()) && logintry < 5) {
    		// 로그인 실패시 시도횟수 update
    		logintry = logintry + 1 ;
    		entity.setRetry(logintry);
    		service.save(entity);
    		
    		log.error("로그인 실패 => " + HttpStatus.UNAUTHORIZED);
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("** id 또는 password 가 다릅니다.");		// UNAUTHORIZED = 401
    	} else if(entity != null && !passwordEncoder.matches(password, entity.getPassword()) && logintry >= 5) {
    		log.error("로그인 실패 => " + HttpStatus.TOO_MANY_REQUESTS);
    		return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("** 로그인 시도 횟수가 초과됐습니다. 비밀번호 변경 후 다시 로그인하세요.");		// TOO_MANY_REQUESTS = 429
    	} else {
    		log.error("로그인 실패 => " + HttpStatus.NOT_FOUND);
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("** 입력하신 정보는 탈퇴 되었거나 없는정보 입니다.");	// NOT_FOUND = 404
    	}
    } //login
    
    // ** 로그아웃
 	@GetMapping("/logout")
 	public ResponseEntity<String> logout(HttpSession session) {
 		// => 세션무효화
 		session.invalidate();
 		log.info("로그아웃 성공");
 		
 		return ResponseEntity.ok("로그아웃 성공");
 		
 	} //logout
 	
 	// ** 회원가입
 	@PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody User entity) {
    	
 		// p.k 설정
		List<String> UserId = service.findAllUserId();
		String proIdsString = UserId.stream().map(id -> id.substring(2)) // 각 항목에서 "UC" 두 글자를 제거
				.map(Integer::parseInt) // 문자열을 int로 변환
				.max(Comparator.naturalOrder()) // 최대값 찾기
				.map(String::valueOf) // int 값을 다시 String으로 변환
				.orElse("NoData"); // 값이 없을 때 처리

		if (proIdsString != "NoData") {

			int nextId = Integer.parseInt(proIdsString) + 1;

			String formattedId = String.format("%08d", nextId);

			entity.setUser_id("UC" + formattedId);

		} else {

			entity.setUser_id("UC" + String.format("%08d", '1'));
			
		}
		
		// passwordEncoder 적용
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
 		
		service.save(entity);
		
 		// 2) Service 처리 & 결과 전송
      	log.info(entity);
    	if( entity!=null ) {
    		log.info("회원가입 성공 => "+HttpStatus.OK);
    		return ResponseEntity.ok(entity);
    	} else {
    		log.error("회원가입 실패 => "+HttpStatus.BAD_GATEWAY);
    		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("** 회원가입 중 오류!!");
    	}
    	
    } //join
 	
 	// ** id중복체크
  	@GetMapping("/checkid/{login_id}")
  	public ResponseEntity<?> checkid(User entity, Model model) {
  		//log.info("login_id 수신"+entity.getLogin_id());
  		entity = service.selectOne(entity.getLogin_id());
  		
  		if( entity == null ) {
 			return ResponseEntity.ok("사용가능 ID");
 		} else {
 			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
 					.body("ID 중복");
 		}
  		
  	} //checkid
 	
//  ** User Detail
 	@PostMapping("/myinfo_update")
 	public ResponseEntity<?> myinfoupdate(@RequestBody User entity) {
 		
 		log.info("회원정보 수정 전 return 값 => "+entity);
 		entity = service.save(entity);
 		log.info("회원정보 수정 후 return 값 => "+entity);
 		
 		if( entity != null ) {
 			return ResponseEntity.ok(entity);
 		} else {
 			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
 					.body("회원정보 update failed.");
 		}
 		
 	} //userdetail
 	
 	@PostMapping("/pwUserCheck")
	public ResponseEntity<?> pwUserCheck(@RequestBody User entity) {
		
 		entity = service.pwUserCheck(entity.getLogin_id(), entity.getPhone_num());
		
		if( entity != null ) {
 			return ResponseEntity.ok(entity);
 		} else {
 			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
 					.body("회원정보가 일치하지 않습니다.");
 		}
	} //pwUpdate

 	@PostMapping("/pwUpdate")
 	public String pwUpdate(@RequestBody User entity, Model model) {
 		
 		log.info("전달된 password값 확인 => "+entity.getPassword());
 		// password 암호화
 		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
 		
 		log.info("암호화한 password값 확인 => "+entity.getPassword());
 		String pwupdateYn = "Password 수정 성공.";
 		
 		try {
 			service.updatePassword(entity.getUser_id(), entity.getPassword());
 			log.info("Password Update 성공 => "+entity.getUser_name());
 			
		} catch (Exception e) {
			log.error("Password Update Exception => "+e.toString());
			pwupdateYn = "Password 수정 실패. 다시 시도하세요.";
		}
 		
 		return pwupdateYn;
 	} //pwUpdate
 	
 	@DeleteMapping("/userdelete")
 	public String userDelete(@RequestParam String user_id, 
 					HttpSession session, RedirectAttributes rttr) {
		// 1) 요청분석
		String uri = "redirect:/";
		
		log.info("삭제 id"+user_id);
		
		// 2) Service & 결과
		try {
			service.deleteByuser_id(user_id);
			log.info("** 회원탈퇴 성공 => "+user_id);
			rttr.addFlashAttribute("message", "탈퇴가 완료 되었습니다..");
			session.invalidate();
		} catch (Exception e) {
			rttr.addFlashAttribute("message", "탈퇴중 오류가 발생했습니다.");
		}
		
		return uri;
	} 
 	
 	@PostMapping("/loginidFind")
 	public ResponseEntity<?> loginidFind(@RequestBody User entity) {
    	
 		String login_id;
 		
    	login_id = service.findloginid(entity.getUser_name(),entity.getPhone_num());
		
		if( login_id != null ) {
 			return ResponseEntity.ok(login_id);
 		} else {
 			return ResponseEntity.status(HttpStatus.NOT_FOUND)
 					.body("입력하신 정보는 탈퇴 되었거나 없는정보 입니다.");
 		}
    } //login
	
} //class
