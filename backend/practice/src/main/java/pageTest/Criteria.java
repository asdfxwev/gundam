package pageTest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//Criteria : 판단이나 결정을 위한 기준
//출력할 Row를 select하기 위한 클래스
//이것을 위한 기준 값들의 관리

// PageMaker : UI에 필요한 정보 완성

// Paging을 하려면
// 1Page에 출력할 Row의 갯수 : 5개
// 현재 출력(요청) Page
// 출력할 List(Rows)
//		- Start Row 순서번호 : 계산 필요
// Criteria Class에 정의

// 1page 출력 pageNo 갯수 : 10개
// 	- pageblack의 firstPageNo
//		- pageBlock의 LastPageNo
// 	- 전진, 후진 표시 여부
// 	- go 전체의 First Page 표시여부
// 	- go 전체의 Last Page 표시여부
// PageMaker Class로 처리

@Getter
@ToString
public class Criteria {

	private int rowsPerPage; // 1page에 출력한 row 갯수
	private int currentPage; // 현재 출력(요청)page
	private int startRowNo; // startRow순서 : 계산이 필요
	private int endRowNo; // endRow 순서 : 계산이 필요(oracle에서는 필요하지만 mysql에서는 필요가 없음)
	private int lastPage;

	@Setter
	private String keyword;
	@Setter
	private String searchType = "all";
	@Setter
	private String[] check;

	// 1. 기본생성자 : 기본값 초기화
	public Criteria() {
		this.rowsPerPage = 5;
		this.currentPage = 1;
		System.out.println("Criteria의 기본생성자");
	}


	// 2. 요청이 들어왔을 때 값을 갱신
	// 2.1 currentPage
	public void setCurrentPage(int currentPage) {
		if (currentPage > 1) {
			this.currentPage = currentPage;
		} else {
			this.currentPage = 1;
		}
	}

	// 2.2 rowsPerPage
	// 페이지당 보여줄 row(record, 튜플) 갯수 확인
	// 제한조건 점검(5 ~ 50개까지만 허용)
	// 당장은 사용하지 않지만 사용가능하도록 작성
	public void setRowsPerPage(int rowsPerPage) {
		if (rowsPerPage > 5 && rowsPerPage <= 50) {
			this.rowsPerPage = rowsPerPage;
		} else {
			this.rowsPerPage = 5;
		}
	}

	// 2.3 setStartRowNo, setEndRowNo 계산
	public void setStartEndNo() {
		if (this.startRowNo < 1) {
			this.startRowNo = 1;
		}
		this.startRowNo = (this.currentPage - 1) * this.rowsPerPage;
		// mysql에서는 limit에 적용 (limit 5,5) = 6번째부터 5개 출력
		// oracle에서는 between 6 and 10 = 6번째부터 5개 출력
		// oracle에서 this.startRowNo = (this.currentPage - 1)*this.rowsPerPage + 1;
		// oracle에서 this.endRowNo = (this.startRowNo + this.rowsPerPage) - 1;
	}

}
