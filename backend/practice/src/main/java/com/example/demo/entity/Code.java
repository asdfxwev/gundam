package com.example.demo.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "code")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Code {
	@Id
    @Column(name = "code_id", length = 10)
    private String code_id;

    @Column(name = "code_name", nullable = false, length = 50)
    private String code_name;

    @Column(name = "code_value", nullable = false, length = 20)
    private String code_value;

    @Column(name = "code_info", length = 100)
    private String code_info;

    @Column(name = "code_in_user", nullable = false, length = 10)
    private String code_in_user;

    @Column(name = "code_dtm", nullable = false)
    private LocalDateTime code_dtm;
}
