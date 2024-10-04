package pageTest;

import java.util.Iterator;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.Getter;
import lombok.ToString;

// PageMaker : View에 필요한 값을 완성
// 전체 row갯수 (전체 page 수 계산 위해 필요)
// 1page당 표시할 pageNo갯수
// view에 표시할 첫 PageNo
// view에 표시할 끝 PageNo
// 출력 가능한 마지막 PageNo(totalRowsCount, rowsPerPage 로 계산)
// 이전 PageBlock으로
// 다음 PageBlock으로

// Criteria를 이용해서

@Getter
@ToString
public class PageMaker {

	private int totalRowsCount; // 출력대상이 되는 전체 Row 갯수 : from DB(count_function)
	private int displayPageNo; // 1page당 표시할 pageNo 갯수
	private int spageNo; // view에 표시할 첫 pageNo
	private int epageNo; // view에 표시할 마지막 pageNo

	// 주의 : 필드명이 sPageNo처럼 두번째 알파벳이 대문자인 경우
	// setter/getter는 setSPageNo, setsPageNo, setSpageNo 형태로 만들어질 수 있기 때문에
	// Lombok.. Spring 등등 API들마다 규칙이 다르므로 오류발생 가능성 높음
	// 그러므로 대•소문자 섞어 사용시 주의

	private int lastPageNo; // 출력 가능한 마지막 pageNo
	private boolean prev; // 이전 pageBlock으로
	private boolean next; // 다음 pageBlock으로

	// pPageList, bCheckList등 요청명에 해당하는 url을 만들 수 있도록 하기 위함.
	private String mappingName;

	Criteria cri;

	// 필요값 set & 계산
	// 1) Criteria
	public void setCri(Criteria cri) {
		this.cri = cri;
	}
	
	public void setMappingName(String mappingName) {
		this.mappingName = mappingName;
	}
	
	// totalRowsCount
	// 출력 대상 전체 rows 갯수 : from DB
	// 이 값을 활용해 나머지 필요값 계산
	public void setTotalRowsCount(int totalRowsCount) {
		this.totalRowsCount = totalRowsCount;
		calcData();
	}
	
	// 나머지 필요값
	public void calcData() {
		// spageNo, epageNo
		// currentPage 번호가 속한 pageBlock의 spageNo, epageNo 계산
		
		// pageNo를 n개씩 출력한다고 가정하면 epageNo는 항상 n의 배수
		// displayPageNo = 3이면 3,6,9,12 ...
		// ex) 17page 요청, displayPageNo = 3 일때 17이 몇번째 그룹인지 계산하려면, 
		// 17 / 3 -> 5 나머지 2 결론은 정수 나누기 후 나머지가 있으면 +1이 필요함
		// math.ceil(17/3) -> math.ceil(5.73..) -> 6 -> 6번째 그룹 16,17,18
		// 즉, 17이 몇번째 그룹인지 계산하고, 여기에 displayPageNo를 하면됨
		
		// math.ceil(c) 매개변수 c보다 크면서 가장 작은 정수를 double의 형태로 반환
		this.epageNo = (int)Math.ceil(cri.getCurrentPage() / (double)this.displayPageNo) * this.displayPageNo;
		this.spageNo = this.epageNo - this.displayPageNo + 1;
		
		// lastPageNo 계산, epageNo의 적합성 확인
		this.lastPageNo = (int)Math.ceil( totalRowsCount / (double)cri.getRowsPerPage());
		if (this.epageNo > this.lastPageNo) {
			this.epageNo = this.lastPageNo;
		}
		
		// prev, next
		prev = spageNo == 1 ? false : true;
		next = epageNo == lastPageNo ? false : true;
		
	}
	
	// 패키지 org.springframework.web.util
	// 웹 개발에 필요한 많은 유틸리티 클래스 제공
	// UriComponents, UriComponentsBuilder
	// Uri를 동적으로 생성해주는 클래스
	// parameter가 조합된 uri를 손쉽게 만들어줌
	// ?currentPage=7&rowsPerPage=10 이것을 만들어줌
	// ?부터 만들어지므로 jsp Code에서 ?포함하지 않도록 주의
	
	// QueryString을 자동으로 생성
	// boardPageList?currentPage=1&rowsPerPage=5
	// UriComponents, UriComponentsBuilder 활용
	// setMappingName(String mappingName) 활용
	// 전체 완성

	public String makeQuery(int currentPage) {
		
//		UriComponents uriComponents = UriComponentsBuilder.newInstance()
//				.queryParam("currentPage", currentPage)
//				.queryParam("rowsPerPage", cri.getRowsPerPage())
//				.build();
		
		// searchDB를 적용했을 경우
		// check 기능 추가
		// 배열을 MultiValueMap으로 넣고 UriComponents에 queryParams를 사용해서 넣으면 된다.
		// MultiValueMap 생성
		MultiValueMap<String, String> checkMap = new LinkedMultiValueMap<String, String>();
		// 담기 전 check의 선택값이 있는 경우에만 checkMap에 담아야 한다.
		if (cri.getCheck() != null && cri.getCheck().length > 0) {
			for(String c : cri.getCheck()) {
				checkMap.add("check", c);
			}
		} else {
			checkMap = null;
		}
		
		UriComponents uriComponents = UriComponentsBuilder.newInstance()
				.queryParam("currentPage", currentPage)
				.queryParam("rowsPerPage", cri.getRowsPerPage())
				.queryParam("searchType", cri.getSearchType())
				.queryParam("keyword", cri.getKeyword())
				.queryParams(checkMap)
				.build();
		return this.mappingName+uriComponents.toString();
	}
	// 배열 Type check 처리 : Map으로 처리
	//  ?currentPage=1&rowsPerPage=5&searchType=t&keyword=Java&check=admin&check=126
    //    위의 쿼리스트링에서 check 부분은 몇개일지 모름
    // => UriComponents 에서 Multi Value 처리 :  queryParams(MultiValueMap<String, String> params) 
    
    // MultiValueMap
    // 키의 중복이 허용됨 즉, 하나의 키에 여러 값을 받을 수 있음
    // new LinkedMultiValueMap() 으로 생성, add("key","value")
    
    // Map (키중복 허용안됨) 과 비교 
    // HashMap : 순서보장 안됨 
    // TreeMap : key값 순서로 자동정렬
    // LinkedHashMap : 입력순서보장
	
	
}
