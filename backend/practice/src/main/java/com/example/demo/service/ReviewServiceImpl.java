package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.ImgDSLRepository;
import com.example.demo.repository.ImgRepository;
import com.example.demo.repository.OrdersItemDSLRepository;
import com.example.demo.repository.ReviewDSLRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
	
	private final ReviewDSLRepository reRepository;
	
	@Override
		public List<String> searchOrderId(String userId, String proId) {
			return reRepository.searchOrderId(userId, proId);
		}

}
