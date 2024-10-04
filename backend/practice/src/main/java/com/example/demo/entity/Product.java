package com.example.demo.entity;


import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="product")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
	
    @Id
    @Column(name = "pro_id", length = 10, nullable = false)
    private String pro_id;

    @Column(name = "pro_name", length = 30, nullable = false)
    private String pro_name;

    @Column(name = "pro_des", columnDefinition = "TEXT", nullable = false)
    private String pro_des;

    @Column(name = "pro_price", nullable = false)
    private Integer pro_price;

    @Column(name = "pro_stock", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer pro_stock;

    @Column(name = "pro_creat", nullable = false, updatable = false)
    private String pro_creat;

    @Column(name = "pro_cate", length = 10, nullable = false)
    private String pro_cate;

    @Column(name = "cate_brand", length = 10, nullable = false)
    private String cate_brand;

    @Column(name = "cate_piece", length = 10, nullable = false)
    private String cate_piece;

    @Column(name = "pro_state_cd", length = 10, nullable = false)
    private String pro_state_cd;

}
