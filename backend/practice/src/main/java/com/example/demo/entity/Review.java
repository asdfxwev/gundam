package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rev_id")
    private Long rev_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // 외래 키로 'user' 테이블의 'user_id' 참조
    private User user;

    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false)  // 외래 키로 'product' 테이블의 'pro_id' 참조
    private Product product;

    @Column(name = "rev_rating", length = 10, nullable = false)
    private String rev_rating;

    @Column(name = "rev_title", length = 30, nullable = false)
    private String rev_title;

    @Column(name = "rev_com", length = 100, nullable = false)
    private String rev_com;

    @Column(name = "rev_creat", columnDefinition = "datetime default current_timestamp", nullable = false)
    private LocalDateTime rev_creat;

    @Column(name = "rev_answer", length = 100)
    private String rev_answer;

    @Column(name = "rev_answer_creat")
    private LocalDateTime rev_answer_creat;

    @Column(name = "rev_image", length = 100)
    private String rev_image;
    
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Orders order;
}
