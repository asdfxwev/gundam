package com.example.demo.domain;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberDTO {

	// 멤버변수
	private String id;
	private String password;
	private String name;
	private int age;
	private int teamno;
	private String info;
	private double point;
	private String birthday;
	private String rid;
	private String uploadfile; // table 보관용(파일명)
	
	private MultipartFile uploadfilef; // form으로부터 전달된 uploadFile의 모든 정보가 담겨있다.
	
}
