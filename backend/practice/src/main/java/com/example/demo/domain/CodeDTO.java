package com.example.demo.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CodeDTO {
	
    private String code_id;
    private String code_name;
    private String code_value;
    private String code_info;
    private String code_in_user;
    private LocalDateTime code_dtm;

}
