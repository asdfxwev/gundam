package com.example.demo.domain;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewDTO extends OrdersDTO {
	
	private String user_id;
	private String pro_id;
	private int rev_rating;
	private String rev_title;
	private String rev_com;
	private String order_id;
	
	

}
