package com.example.demo.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="cart")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(CartId.class)
public class Cart implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // 'user' 테이블의 'user_id'를 참조
    private User user_id;

    @Id
    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false)  // 'product' 테이블의 'pro_id'를 참조
    private Product pro_id;

    @Column(name = "cart_quantity", nullable = false)
    private int cart_quantity;
}
