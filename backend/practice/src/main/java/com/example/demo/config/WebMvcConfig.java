package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//** WebMvcConfigurer
//=> 스프링의 자동설정에 원하는 설정을 추가 설정할수있는 메서드들을 제공하는 인터페이스. 
//=> 스프링부트 컨트롤러 매핑메서드에서는 "/" 무시됨 -> addViewControllers 메서드로 해결(boot3 부터는 "/" 지원됨)
// => CORS 방침 설정 -> addCorsMappings()

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	// => boot3 부터는 없어도 지원되지만 참고용
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		// WebMvcConfigurer.super.addCorsMappings(registry);
		registry.addViewController("/").setViewName("redirect:/");
	}
	
	// ** React Project CORS 방침 설정
	// ** CORS 방침 설정
    // => CORS(Cross-Origin Resource Sharing) : 교차(다른) 출처 리소스 공유 
    // => Origin: Protocol, Host, 포트번호를 합친것으로 서버를 찾아가기위한 가장기본적인 주소
    // => 요청헤더에는 이요청의 Origin이 담겨있고 서버는 이를 확인해 자신의 Origin과 다르면 이요청을 거절함 (403) 
    //    그러므로 서버에서 이를 허용하는 방침을 설정해야함.
    // => (CORS 개념 & 해결법 - 정리 All, Good)  
    //      https://inpa.tistory.com/entry/WEB-📚-CORS-💯-정리-해결-방법-👏 
    
    // ** [Spring Boot] CORS 해결 방법 3가지  (https://wonit.tistory.com/572 )
    // => Filter, @CrossOrigin, WebMvcConfigurer
    
    // => 방법1 설정 
    //    아래 addCorsMappings(...) 메서드를 이용해서 CORS를 적용할 URL패턴을 정의할 수 있음 
    // => https://dev.exd0tpy.xyz/49 
    
    // => 방법2 Controller 또는 메소드단에서 annotation을 통해 적용 
    //    @CrossOrigin(origins = "*", allowedHeaders = "*")
    
    // => 방법3 Filter
    //       커스텀필터(CorsFilter) 를 만들어 직접 response에 header를 넣어주기
    //    - Filter 인터페이스를 구현하여 doFilter 메서드 Override
    //    - @Component 에너테이션 추가 
    //    - Filter 는 꼭 javax.servlet 의 Filter를 사용함.
	
	private final long MAX_AGE_SECS = 3600; //단위: 초
	
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// 모든 경로에 대해 적용
		registry.addMapping("/**") //애플리케이션의 모든 엔드포인트에 대한 CORS매핑추가
				.allowedOrigins("Http://localhost:3000")
				.allowedMethods("*")
				//.allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
				// => CORS정책상 접근 가능한 origin인지 확인하기 위해 preflight를 보내는데, 이때 메소드가 'OPTION' 이므로 반드시 추가	
				//.allowedHeaders("*")
				.allowCredentials(true)
				// => credentials true와 origins "*" 값은 공존할 수 없음(그러므로 origins 속성값은 구체적으로 명시함) 
				.maxAge(MAX_AGE_SECS);
	} //addCorsMappings
	
	
} //class
