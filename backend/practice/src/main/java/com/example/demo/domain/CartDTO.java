package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class CartDTO extends ProductDTO {
    private String user_id;
    private String pro_id;
    private String pro_name;
    private int pro_price;
    private String pro_imgs;
    private int cart_quantity;
	@Override
	public String toString() {
		return "CartDTO [cart_quantity=" + cart_quantity + ","
				+ "pro_name="+pro_name +", pro_price="+pro_price +""
				+ ",pro_imgs="+pro_imgs+""
				+",pro_id="+pro_id+""
				+ " total_price="+cart_quantity*pro_price+"]";
	}
    
    
}
