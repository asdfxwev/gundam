package com.example.demo.domain;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewModifyDTO extends OrdersDTO {
	
	private Long rev_id;
	private String user_id;
	private int rev_rating;
	private String rev_title;
	private String rev_com;
	
	

}
