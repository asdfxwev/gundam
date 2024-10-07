package com.example.demo.entity;

import java.io.Serializable;

import org.hibernate.annotations.Check;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(CartId.class)
public class Cart implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id", nullable = false)  // 'user' 테이블의 'user_id'를 참조
    private String userId; // user_id로 변경

    @Id
    @Column(name = "pro_id", nullable = false)  // 'product' 테이블의 'pro_id'를 참조
    private String proId; // pro_id로 변경

    @Column(name = "cart_quantity", nullable = false)
    private int cartQuantity; // cart_quantity로 변경
}
