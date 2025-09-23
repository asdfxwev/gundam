package com.example.demo.domain;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.Data;


@Data
public class PageResultDTO<DTO, EN> { // ~DTO, Entity
	
	// DTO List
	private List<DTO> dtoList;
	
	// 총 PageNo
	private int totalPage;
	
	private int page; // 출력할 페이지 번호(currentPage)
	private int size; // 페이지 당 출력할 row의 개수(rowsPerPage)
	
	private int start, end;
	private boolean prev, next;
	private List<Integer> pageList; // pageNo 목록
	
	// constructor definition
	// generic은 compile time에 type을 전달해서 결정하는 것으로
	// 생성자메서드 정의시에는 정의하지 않음(정의하면 오히려 compile error is occuring)
	// 인자1 : JPA의 페이징 결과물인 page<EN> type을 이용해 최종 List<DTO> 생성
	// 인자2 : Function<EN, DTO> : Entity 객체들을 DTO 변환
	public PageResultDTO(Page<EN> result, Function<EN, DTO> fn) {
		
		// result -> List<DTO>로 변환
		dtoList = result.stream().map(fn).collect(Collectors.toList());
		// stream()
		// - 배열, 컬렉션등을 대상으로하여 스트림을 생성해줌
		// - 스트림은 forEach(), filter(), sum(), map() 등 다양한 연산을 할 수 있는 메서드 제공
		// - Page객체에서는 stream을 생성하기에 적절한 자료(content)에 적용됨
		// map(fn)
		// - spring 요소 중에서 원하는 필드만 뽑아내거나 특정 형태로 변환해야 할 때 사용
		// - Entity 객체들을 DTO로 변환
		// collect()
		// - 스트림의 요소들을 수집하는 최종연선
		// - Collectors 클래스의 toList() : 스트림의 모든 요소를 List로 수집
		
		// 출력에 필요한 값 계산
		totalPage = result.getTotalPages();
		makePageList(result.getPageable());
	}
	
    private void makePageList(Pageable pageable){

        this.page = pageable.getPageNumber() + 1; // 0부터 시작하므로 1을 추가
        this.size = pageable.getPageSize();
        System.out.println("page = "+page); // 몇 페이지인지
        System.out.println("size = "+size); // size는 몇 개씩 보이게 할 것인지

        int tempEnd = (int)(Math.ceil(page/(double)size)) * size;
        System.out.println("tempEnd = "+tempEnd);
        start = tempEnd - (size - 1); // 4 = (size - 1)
        end = totalPage > tempEnd ? tempEnd: totalPage;
        System.out.println("start = "+start);
        System.out.println("end = "+end);

        prev = start > 1;
        next = totalPage > end;

        pageList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
        //=> IntStream : 기본자료형 int 형식의 연산에 최적화되어 있는 스트림 인터페이스
        //=> rangeClosed() : start ~ end 까지 즉, 종료값 포함 return 
        //=> boxed() : 숫자(int) 스트림을 일반스트림(객체형) 으로 변환
    } //makePageList
	
	
	
	
	
	
	
	
	
	
	
	
}
