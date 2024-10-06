package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDTO extends ProductDTO {
    @NotNull(message = "사용자 ID는 필수입니다.")
    private String user_id;

    @NotNull(message = "상품 ID는 필수입니다.")
    private String pro_id;

    @NotNull(message = "수량은 필수입니다.")
    private int cart_quantity;

    @Override
    public String toString() {
        return "CartDTO [user_id=" + user_id + ", pro_id=" + pro_id + ", cart_quantity=" + cart_quantity + "]";
    }
}
