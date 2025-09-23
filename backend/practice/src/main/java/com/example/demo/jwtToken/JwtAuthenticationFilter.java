package com.example.demo.jwtToken;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private TokenProvider tokenProvider;
	
	// ** doFilterInternal()	FALLGIFT
	// => 인증처리 담당 메서드
	
	// => tokenProvider.validateAndGetUserId(token) 사용
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			// 1) request 에서 토큰 가져오기.
			String token = parseBearerToken(request); // 아래쪽에 메서드 구현
			log.info("JwtAuthenticationFilter doFilterInternal(), token 확인 => "+token);
			
			// 2) 토큰 검증 & userId 가져오기
            // => JWT이므로 Authorization(인가) 서버에 요청하지않고 검증가능함.
            // => TokenProvider 의 검증메서드를 통해 검증후 id 전달받음 (위조된 경우 예외처리 됨)
			if( token!=null && !token.equalsIgnoreCase("null") ) {
				String userId = tokenProvider.validateAndGetUserId(token);
				log.info("JwtAuthenticationFilter doFilterInternal(), userId 확인 => "+userId);
				
				// 3) 인증 완료
				//=> id, password 등 인증정보를 UsernamePasswordAuthenticationToken 에 보관
				//=> SecurityContext에 인증된 Authentication을 저장 
				//=> SecurityContextHolder에 등록 (등록 되어야 인증된 user로 인식함)
				
				AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userId,
						null);
				
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				// => SecurityContextHolder에 인증된 user등록.
                //    SecurityContextHolder에 등록해야 인증된 user라고 생각하고, user를 인식한다.
                //  -> SecurityContextHolder.createEmptyContext() 메서드로 SecurityContext 생성하고
                //  -> 여기에 SecurityContext 에 인증정보를 넣고
                //  -> 다시 SecurityContextHolder 에 컨텍스트로 등록함.
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				securityContext.setAuthentication(authentication);
				SecurityContextHolder.setContext(securityContext);
				
			} //if
            
		} catch (Exception e) {
			log.info("JwtAuthenticationFilter doFilterInternal() Exception => "+e.toString());
			
		}
		
		filterChain.doFilter(request, response);
		
	} //doFilterInternal
	
	// => Request 객체의 Header 를 파싱해서 token 을 return
	private String parseBearerToken(HttpServletRequest request) {
		
		String bearerToken = request.getHeader("Authorization");
		if( StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ") ) {
			return bearerToken.substring(7);
		}
		return null;
	} //parseBearerToken
	
} //class
