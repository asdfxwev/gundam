package com.example.demo.entity;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="img")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Img {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id", nullable = false)
	// img entity id
	private Long img_id;
	
//	이미지 이름
    @Column(name = "pro_imgs", length = 100) 
    private String pro_imgs;

    // img num
    @Column(name = "pro_num", length = 2)
    private int pro_num;
    
    // product_id
    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false)  // 외래 키로 'product' 테이블의 'pro_id' 참조
    private Product pro_id;
    
    @Transient
    private MultipartFile pros_imgs;
    
    @Transient
    private MultipartFile pros_img;
	
}

