<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot Mybatis BoardPageList **</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/myStyle.css">
<script type="text/javascript">
	"use strict"
	// searchType을 all 선택하면 keyword를 지워줘야한다.
	function keywordClear() {
		if (document.getElementById("searchType").value == 'all') {
			document.getElementById("keyword").value = '';
		}
	}

	// self.location
	// 1. location 객체 직접사용 Test : url로 이동, history에 기록됨
	// self.location = "boardPageList?currentPage=??" : 해당 요청을 서버로 전달
	// 2. location 객체의 메서드
	// href, replace('...'), reloac()

	// searchDB
	// 검색조건을 입력 후 버튼 클릭하면 입력값들을 서버로 보내줘야 한다.
	// location 객체 사용
	function searchDB() {
		self.location = 'boardPageList' + '?currentPage=1&rowsPerPage=5'
				+ '&searchType=' + document.getElementById("searchType").value
				+ '&keyword=' + document.getElementById("keyword").value;
		//self.location = ${pageMaker.makeQuery(1)}

	}
	//+${pageMaker.makeQuery(1)}
	// 하나의 jsp문서로 다양한 요청을 처리하기 위해 QueryString에 url을 포함했고
	// 기본 요청 값(searchType, keyword)들이 없기 때문에
	// 첫 요청에서는 makeQuery메서드를 사용할 수 없음

	// JS코드 내부에서 EL Tag 사용시 주의사항
	// JS코드의 String 내에서 사용한 EL Tag는 JSP가 처리해주므로
	// 사용가능하지만, 이 script가 외부 문서인 경우에는 처리해주지 않으므로 주의
	// 이 코드를 외부문서로 작성하면 "${pageMaker.makeQuery(1)}" 이 글자 그대로 적용되어 404 발생

	// ** querySelector
	// css 선택자를 이용하여 첫번째 만난 요소 1개만 선택

	// ** querySelectorAll 
	// css 선택자를 이용하여 해당하는 nodeList 를 반환
	// ","를 사용하면 여러 요소를 한번에 가져올 수 있음
	// querySelectorAll("#id,.class");
	// 그러므로 반복문과 이용됨.

	// BoardCheckList Test
	// 취소버튼 클릭시 checked값이 clear되도록 function checkClear() 추가함
	// reset버튼은 기본적으로 새로고침과 동일하게 처리되어 ${pageMaker.cri.check}로 전달된 초기값이 계속 적용되기 때문
	function checkClear() {
		//document.querySelectorAll('.Ckear').checked=false;
		// 배열형식으로 nodeList를 반환하기 때문에 위와같이 처리하면 안되고 반복문으로 처리해야 한다.
		let ck = document.querySelectorAll('.clear');
		for (let i = 0; i < ck.length; i++) {
			ck[i].checked = false;
		}
		return false
	}
</script>
</head>
<body>
	<h2>** Spring_Boot Mybatis BoardPageList **</h2>
	<hr>
	<c:if test="${!empty requestScope.message}">
 ${requestScope.message}<br>
		<hr>
	</c:if>
	<hr>
	<div id="searchBar">
		<select name="searchType" id="searchType" onchange="keywordClear()">
			<option value="all"
				${pageMaker.cri.searchType == 'all' ? 'selected' : ''}>전체</option>
			<option value="title"
				${pageMaker.cri.searchType == 'title' ? 'selected' : ''}>제목</option>
			<option value="content"
				${pageMaker.cri.searchType == 'content' ? 'selected' : ''}>내용</option>
			<option value="id"
				${pageMaker.cri.searchType == 'id' ? 'selected' : ''}>글쓴이</option>
			<option value="regdate"
				${pageMaker.cri.searchType == 'regdate' ? 'selected' : ''}>날짜</option>
			<option value="tc"
				${pageMaker.cri.searchType == 'tc' ? 'selected' : ''}>제목과내용</option>
		</select> <input type="text" name="keyword" id="keyword"
			value="${pageMaker.cri.keyword }">
		<button id="searchBtn" onclick="searchDB()">검색</button>
		<hr>
		<!-- checkBox -->
		<form action="boardCheckList" method="get">
			<b>ID : </b>
			<!-- Check의 선택값의 유지를 위한 확인코드 -->
			<c:set var="ck1" value="false" />
			<c:set var="ck2" value="false" />
			<c:set var="ck3" value="false" />
			<c:set var="ck4" value="false" />
			<c:set var="ck5" value="false" />
			<c:forEach var="id" items="${pageMaker.cri.check}">
				<c:if test="${id == 'admin'}">
					<c:set var="ck1" value="true" />
				</c:if>
				<c:if test="${id == '126'}">
					<c:set var="ck2" value="true" />
				</c:if>
				<c:if test="${id == 'qwer'}">
					<c:set var="ck3" value="true" />
				</c:if>
				<c:if test="${id == 'asdf'}">
					<c:set var="ck4" value="true" />
				</c:if>
				<c:if test="${id == '21woo'}">
					<c:set var="ck5" value="true" />
				</c:if>
			</c:forEach>


			<input type="checkbox" name="check" class="clear" value="admin" ${ck1 ? 'checked' : '' }>관리자&nbsp;
			<input type="checkbox" name="check" class="clear" value="126"${ck2 ? 'checked' : '' }>126&nbsp;
			<input type="checkbox" name="check" class="clear" value="qwer"${ck3 ? 'checked' : '' }>qwer&nbsp;
			<input type="checkbox" name="check" class="clear" value="asdf"${ck4 ? 'checked' : '' }>asdf&nbsp;
			<input type="checkbox" name="check" class="clear" value="21woo"${ck5 ? 'checked' : '' }>21woo&nbsp;
			<input type="submit" value="Search">&nbsp; 
			<input type="reset" value="Clear" onclick="return checkClear()">&nbsp;<br>
		</form>
	</div>

	<table style="width: 100%">
		<tr bgcolor="#7ba5f0">
			<th>Seq</th>
			<th>Title</th>
			<th>ID</th>
			<th>RegDate</th>
			<th>조회수</th>
		</tr>
		<c:if test="${!empty requestScope.boardList}">
			<c:forEach var="b" items="${requestScope.boardList}">
				<tr>
					<td>${b.seq}</td>
					<td>
						<!-- 답글 등록 후 Title 출력전에 들여쓰기 추가 --> <c:if test="${b.indent>0}">
							<c:forEach begin="1" end="${b.indent}">
								<span>&nbsp;&nbsp;</span>
							</c:forEach>
							<span style="color: Chocolate;"><b>re..</b></span>
						</c:if> <!-- 로그인 한 경우에만 글내용 볼 수 있도록 --> <c:if test="${!empty loginID}">
							<a href="detail?jCode=D&seq=${b.seq}">${b.title}</a>
						</c:if> <c:if test="${empty loginID}">
				${b.title}
			</c:if>
					</td>
					<td>${b.id}</td>
					<td>${b.regdate}</td>
					<td>${b.cnt}</td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.boardList}">
			<tr>
				<td colspan="5">~~ 출력자료가 1건도 없습니다. ~~</td>
			</tr>
		</c:if>
	</table>
	<hr>
		<!-- ** Paging Block ** 
	=> ver01: QueryString 수동 입력 -> 자동생성 makeQuery 메서드 적용
	=> ver02: makeQuery 메서드 -> searchQuery 메서드로 변경
 	1) FirstPage, Prev  
 	=> OLD
 		<a href="bPageList?currPage=1&rowsPerPage=5">FP</a>&nbsp;
		<a href="bPageList?currPage=${pageMaker.spageNo-1}&rowsPerPage=5">&LT;</a>&nbsp;&nbsp; 
 	 
 	 new : makeQuery 활용
 	 
 	 
 	 -->
	<div align="center">
		<c:choose>
			<c:when test="${pageMaker.prev && pageMaker.spageNo>1}">
				<a href="${pageMaker.makeQuery(1)}">FP</a>&nbsp;
				<a href="${pageMaker.makeQuery(pageMaker.spageNo - 1)}">&LT;</a>&nbsp;&nbsp;  
			</c:when>
			<c:otherwise>
				<font color="Gray">FP&nbsp;&LT;&nbsp;&nbsp;</font>
			</c:otherwise>
		</c:choose>
		<!-- 2) Display PageNo 
	=> currPage 제외한 PageNo 만 a Tag 적용 -->
		<c:forEach var="i" begin="${pageMaker.spageNo}"
			end="${pageMaker.epageNo}">
			<c:if test="${i==pageMaker.cri.currentPage}">
				<font color="red" size="5"><b>${i}</b></font>&nbsp;
  			</c:if>
			<c:if test="${i!=pageMaker.cri.currentPage}">
				<a href=" ${ pageMaker.makeQuery(i)}">${i}</a>&nbsp;
  			</c:if>
		</c:forEach>
		<!-- 3) Next, LastPage  -->
		<c:choose>
			<c:when test="${pageMaker.next && pageMaker.epageNo>0}">
  		&nbsp;<a href="${ pageMaker.makeQuery(pageMaker.epageNo+1)}">&GT;</a>
  		&nbsp;<a href="${ pageMaker.makeQuery(pageMaker.lastPageNo)}">LP</a>
			</c:when>
			<c:otherwise>
				<font color="Gray">&nbsp;&GT;&nbsp;LP</font>
			</c:otherwise>
		</c:choose>
	</div>
	<hr>
	<!-- 로그인 한 경우에만 새글등록 할 수 있도록 -->
	<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="boardInsert">새글등록</a>&nbsp;
</c:if>
	&nbsp;
	<a href="/home">Home</a>&nbsp; &nbsp;
	<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
</body>
</html>