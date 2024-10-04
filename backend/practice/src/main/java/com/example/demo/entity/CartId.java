package com.example.demo.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartId implements Serializable {
	private static final long serialVersionUID = 1L;
	private String user_id;
	private String pro_id;
}
