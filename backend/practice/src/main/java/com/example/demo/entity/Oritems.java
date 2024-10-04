package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="oritems")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Oritems {
	
    @Id
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)  // 외래 키로 'orders' 테이블의 'order_id' 참조
    private Orders order_id;

    @Id
    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false)  // 외래 키로 'product' 테이블의 'pro_id' 참조
    private Product pro_id;

    @Column(name = "oritem_quan", nullable = false, length = 10)
    private String oritem_quan;
    
}
