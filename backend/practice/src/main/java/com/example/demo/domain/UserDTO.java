package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO extends CodeDTO {
	
	private String token;
	private String user_id;
	private String login_id;
	private String user_name;
	private String password;
	private String email;
	private String birth;
	private String gender;
	private String phone_num;
	private String postcode;
	private String address;
	private String dtl_address;
	private String user_cd;
	private String user_creat;
	private String lastcon_dtm;
	private int retry;
	
}
