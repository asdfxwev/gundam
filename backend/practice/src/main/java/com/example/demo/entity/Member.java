package com.example.demo.entity;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="member")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    
    @Id
    private String id;
    
    @Column(updatable = false)
    private String password;
    
    @Column(name = "name", unique = true, nullable = false)
    private String name;
    
    private int age;
    private int teamno;
    private String info;
    private double point;
    private String birthday;
    private String rid;
    private String uploadfile;
    
    @Transient
    private MultipartFile uploadfilef;
}