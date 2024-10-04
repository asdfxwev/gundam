package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDTO extends ProductDTO {
    private String user_id;
    private String pro_id;
    private int cart_quantity;
	@Override
	public String toString() {
		return "CartDTO [user_id=" + user_id + ", pro_id=" + pro_id + ", cart_quantity=" + cart_quantity + "]";
	}
    
    
}
