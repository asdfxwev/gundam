package com.example.demo.domain;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;




@AllArgsConstructor
@Data
@Builder
public class PageRequestDTO {
	
	private int page; // 출력할 페이지 번호(currentPage)
	private int size; // 페이지 당 출력할 row의 개수(rowsPerPage)
	private String type;
	private String keyword;
	
	public void PageRequestDTO() {
		this.page = 1;
		this.size = 5;
	}
	
	public Pageable getPageable(Sort sort) {
		
		return PageRequest.of(page - 1, size, sort);
		// of : 페이징을 위한 데이터의 조건을 적어주는 메서드
		// JPA에서는 pageNo가 0 부터 시작하기 때문에 page - 1
		// 단, application.properties에서 변경 가능
		// #pageable : 1페이지부터 시작하도록 변경
		// spring.data.web.pageable.one-indexed-parameters=true
		
		// sort : 필요시 사용을 위함
		
	}
}
