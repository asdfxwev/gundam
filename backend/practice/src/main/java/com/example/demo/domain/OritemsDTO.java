package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OritemsDTO extends OrdersDTO {
	private String order_id;
	private String pro_id;
	private String oritem_quan;
}
