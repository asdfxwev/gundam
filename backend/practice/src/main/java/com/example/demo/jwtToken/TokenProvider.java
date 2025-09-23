package com.example.demo.jwtToken;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenProvider {

	private static final String SECRET_KEY = "zAq1XsW2cde3VFR4";
	
	// 1. JWT Token 발급
	public String create(String login_id) {
		// 1.1) 유효기한 설정
		// => 현재시간 으로부터 1일로 설정
		//	( 현재시간 으로부터 차이가 +1일 되는 날 설정 )
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
											// => 일(Day) 의 차이가 1 이되는 값들의미
		
		// 1.2) Jwts(JWT 관리 API) 클래스로 토큰 생성 보관
		// => JSON 생성, 서명, 인코딩, 디코딩, 파싱 등 토큰관리 기능 제공.
		return Jwts.builder()
					// => header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
					.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
					
					// => payload에 들어갈 내용
					.setClaims(null)
					.setSubject(login_id)		// sub: subject(유일해야함->userId 보관)
					.setIssuer("GundamApplication")		// iss: Issuer, 발급 주체g
					.setIssuedAt(new Date())	// iat: Issued At, 토큰 발급시간
					.setExpiration(expiryDate)	// exp: Expiration, 토큰 만료시간
					.compact();
	} //create
	
	// 2. 검증
	// => 토큰을 디코딩 및 파싱 하여 토큰의 위조여부 확인 후
	// => subject 에 보관한 userId 를 꺼내어 return
	public String validateAndGetUserId(String token) {
		try {
			Claims claims = Jwts.parser()
								.setSigningKey(SECRET_KEY)
								.parseClaimsJws(token)
								.getBody();
			return claims.getSubject();
		} catch (Exception e) {
	        System.out.println("토큰 유효성 검사 실패: " + e.getMessage());
	        throw new RuntimeException("유효하지 않은 토큰입니다.");
	    }
	} //validateAndGetUserId
	
} //class
