package com.example.demo.entity;

import java.time.LocalDateTime;

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
@Table(name="orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Orders {
    @Id
    @Column(name = "order_id", length = 20)
    private String order_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // 외래 키로 'user' 테이블의 'user_id' 참조
    private User user;

    @Column(name = "order_date", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime order_date;

    @Column(name = "order_status", nullable = false, length = 10)
    private String order_status;

    @Column(name = "postcode", nullable = false, length = 6)
    private String postcode;

    @Column(name = "oritem_address", nullable = false, length = 10)
    private String oritem_address;

    @Column(name = "oritem_dtladdress", nullable = false, length = 150)
    private String oritem_dtladdress;

    @Column(name = "oritem_name", nullable = false, length = 10)
    private String oritem_name;

    @Column(name = "oritem_number", nullable = false, length = 11)
    private String oritem_number;

    @Column(name = "pay_method", nullable = false, length = 10)
    private String pay_method;

    @Column(name = "oritem_payment", nullable = false)
    private int oritem_payment;

    @Column(name = "oritem_count", nullable = false)
    private int oritem_count;
}
