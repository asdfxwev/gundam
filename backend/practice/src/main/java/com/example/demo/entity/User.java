package com.example.demo.entity;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user", uniqueConstraints = {
	    @jakarta.persistence.UniqueConstraint(name = "login_uk", columnNames = "login_id")
	})
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @Column(name = "user_id", length = 10)
    private String user_id;

    @Column(name = "login_id", length = 20, unique = true)
    private String login_id;

    @Column(name = "user_name", nullable = false, length = 10)
    private String user_name;

    @Column(name = "password", nullable = false, length = 100, updatable = false)
	// => 별도로 수정하기위함
    
    private String password;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "birth", nullable = false, length = 20)
    private String birth;

    @Column(name = "gender", nullable = false, length = 1)
    private String gender;

    @Column(name = "phone_num", nullable = false, length = 11)
    private String phone_num;

    @Column(name = "postcode", nullable = false, length = 6)
    private String postcode;

    @Column(name = "address", nullable = false, length = 100)
    private String address;

    @Column(name = "dtl_address", nullable = false, length = 150)
    private String dtl_address;

    @Column(name = "user_cd", nullable = false, length = 10, columnDefinition = "varchar(10) default 'uc02'")
    private String user_cd;

    @Column(name = "user_creat", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime user_creat;

    @Column(name = "lastcon_dtm", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime lastcon_dtm;

    @Column(name = "retry", columnDefinition = "int default 0")
    private Integer retry;
}
