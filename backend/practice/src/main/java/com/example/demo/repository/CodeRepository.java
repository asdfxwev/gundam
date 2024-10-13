package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Code;

public interface CodeRepository extends JpaRepository<Code, String> {
	
}
