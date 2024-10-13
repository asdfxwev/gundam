package com.example.demo.entity;

import jakarta.persistence.*;
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
@IdClass(OritemsId.class) // 복합 키 클래스 지정
public class Oritems {
	
    @Id
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false) // 외래 키로 'orders' 테이블의 'order_id' 참조
    private Orders order_id;

    @Id
    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false) // 외래 키로 'product' 테이블의 'pro_id' 참조
    private Product pro_id;

    @Column(name = "oritem_quan", nullable = false, length = 10)
    private String oritem_quan;  
}
