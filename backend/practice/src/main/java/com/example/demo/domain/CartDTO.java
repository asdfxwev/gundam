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
public class CartDTO {
    private String user_id; 
    private String pro_id;    
    private String pro_name;  
    private int pro_price;     
    private String pro_imgs; 
    private int cart_quantity;  
    private String user_name;   
    private String email;      
    private String phone_num;

    @Override
    public String toString() {
        return "CartDTO [cart_quantity=" + cart_quantity +
               ", pro_name=" + pro_name + 
               ", pro_price=" + pro_price +
               ", pro_imgs=" + pro_imgs + 
               ", pro_id=" + pro_id + 
               ", total_price=" + (cart_quantity * pro_price) + 
               ", user_name=" + user_name + 
               ", phone_num=" + phone_num + 
               ", email=" + email + "]";
    }
}
