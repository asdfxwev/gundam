package com.example.demo.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrdersDTO extends ProductDTO {
    private String order_id;
    private String user_id;
    private LocalDateTime order_date;
    private String order_status;
    private String postcode;
    private String oritem_address;
    private String oritem_dtladdress;
    private String oritem_name;
    private String oritem_number;
    private String pay_method;
    private int oritem_payment;
    private int oritem_count;
}
