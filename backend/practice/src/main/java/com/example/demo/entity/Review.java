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
    private Long revId;

    @Column(name = "user_id", length = 10)
    private String userId;

    @Column(name = "pro_id", length = 10)
    private String proId;

    @Column(name = "rev_rating", length = 10, nullable = false)
    private String revRating;

    @Column(name = "rev_title", length = 30, nullable = false)
    private String revTitle;

    @Column(name = "rev_com", length = 100, nullable = false)
    private String revCom;

    @Column(name = "rev_cnt", columnDefinition = "int default 0")
    private Integer revCnt = 0;

    @Column(name = "rev_creat", columnDefinition = "datetime default current_timestamp", nullable = false)
    private LocalDateTime revCreat;

    @Column(name = "rev_answer", length = 100)
    private String revAnswer;

    @Column(name = "rev_answer_creat")
    private LocalDateTime revAnswerCreat;

    @Column(name = "rev_image", length = 100)
    private String revImage;

    @ManyToOne
    @JoinColumn(name = "pro_id", insertable = false, updatable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
    
    // Order와의 다대일 관계 설정
    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Orders order;
}
