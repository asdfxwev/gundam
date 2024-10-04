package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDTO extends CodeDTO {
	
	private String pro_id;
	private String pro_name;
	private String pro_des;
	private int pro_price;
	private int pro_stock;
	private String pro_creat;
	private String pro_cate;
	private String cate_brand;
	private String cate_piece;
	private String pro_state_cd;
	private String pro_image;
	
	
	
}
