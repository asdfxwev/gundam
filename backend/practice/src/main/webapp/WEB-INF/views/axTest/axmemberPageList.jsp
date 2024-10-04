<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring MemberList</title>
<style>
* {
	font-size: 1.5rem;
	color: aqua;
	font-weight: bold;
	text-align: center;
}
</style>
</head>
<body>
<!-- 
검색 & 페이징 포함한 요청의 Ajax 처리
Ajax 요청 function 작성, url을 매개변수로 전달 : axiMListCri(url)
page 요청 : a Tag => span으로 변경하고 function으로 처리
Check 검색은 submit을 사용하기 때문에 적용하지 않음(주석처리)

Ajax 처리시에는 문서 내부의 function이 인식 안되므르
searchDB(), keywordClear, checkClear() 모두 axTest3.js에 작성 
-->
	<h2>Spring Axios MemberPageList</h2>
	<hr>
	<div id="searchBar">
		<select name="searchType" id="searchType" onchange="keywordClear()">
			<option value="all"
				${pageMaker.cri.searchType == 'all' ? 'selected' : ''}>전체</option>
			<option value="id"
				${pageMaker.cri.searchType == 'id' ? 'selected' : ''}>ID</option>
			<option value="name"
				${pageMaker.cri.searchType == 'name' ? 'selected' : ''}>이름</option>
			<option value="age"
				${pageMaker.cri.searchType == 'age' ? 'selected' : ''}>나이</option>
			<option value="birthday"
				${pageMaker.cri.searchType == 'birthday' ? 'selected' : ''}>생년월일</option>
			<option value="info"
				${pageMaker.cri.searchType == 'info' ? 'selected' : ''}>정보</option>
		</select> 
		<input type="text" name="keyword" id="keyword"value="${pageMaker.cri.keyword }">
		<button id="searchBtn" onclick="searchDB()">검색</button>
		<hr>
		<!-- checkBox -->
		<form action="memberCheckList" method="get">
			<b>Team : </b>
			<!-- Check의 선택값의 유지를 위한 확인코드 -->
			<c:set var="ck1" value="false" />
			<c:set var="ck2" value="false" />
			<c:set var="ck3" value="false" />
			<c:set var="ck4" value="false" />
			<c:set var="ck5" value="false" />
			<c:forEach var="teamno" items="${pageMaker.cri.check}">
				<c:if test="${teamno == '1'}">
					<c:set var="ck1" value="true" />
				</c:if>
				<c:if test="${teamno == '2'}">
					<c:set var="ck2" value="true" />
				</c:if>
				<c:if test="${teamno == '3'}">
					<c:set var="ck3" value="true" />
				</c:if>
				<c:if test="${teamno == '4'}">
					<c:set var="ck4" value="true" />
				</c:if>
				<c:if test="${teamno == '8'}">
					<c:set var="ck5" value="true" />
				</c:if>
			</c:forEach>


			<input type="checkbox" class="check clear" value="1"	${ck1 ? 'checked' : '' }>우린팀&nbsp; 
			<input type="checkbox" class="check clear" value="2" ${ck2 ? 'checked' : '' }>모꼬지&nbsp;
			<input type="checkbox" class="check clear" value="3"	${ck3 ? 'checked' : '' }>asdf&nbsp; 
			<input type="checkbox" class="check clear" value="4" ${ck4 ? 'checked' : '' }>컴포NaN트&nbsp;
			<input type="checkbox" class="check clear" value="8"	${ck5 ? 'checked' : '' }>조이름테스트&nbsp; 
			<!-- Axios 적용
			 submit을 Button 속성으로 변경 -->
			<button type="button" onclick="axiMListCheck()">검색</button>&nbsp; 
			<input type="reset" value="Clear" onclick="return checkClear()">&nbsp;<br>
		</form>
	</div>


	<table border="1" , style="width: 100%">
		<tr style="background-color: aquamarine;">
			<th>id</th>
			<th>name</th>
			<th>age</th>
			<th>teamno</th>
			<th>info</th>
			<th>point</th>
			<th>birthday</th>
			<th>rid</th>
			<th>image</th>
		</tr>
		<c:if test="${not empty requestScope.memberlist }">
			<c:forEach var="memberlist" items="${requestScope.memberlist }">
				<tr>
					<td>${memberlist.id}</td>
					<td>${memberlist.name}</td>
					<td>${memberlist.age}</td>
					<td>${memberlist.teamno}</td>
					<td>${memberlist.info}</td>
					<td>${memberlist.point}</td>
					<td>${memberlist.birthday}</td>
					<td>${memberlist.rid}</td>
					<td>
						<image alter="myimage" width="50" height="75" src="/resources/uploadimages/${memberlist.uploadfile}"> </image>
					</td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.memberlist }">
			<tr>
				<td colspan="9">데이터가 없지롱</td>
			</tr>
		</c:if>
	</table>
	<hr>
	<div align="center">
		<c:choose>
			<c:when test="${pageMaker.prev && pageMaker.spageNo>1}">
				<span class="textlink" onclick="axiMListCri('${pageMaker.makeQuery(1)}')">FP</span>&nbsp;
				<span class="textlink" onclick="axiMListCri('${pageMaker.makeQuery(pageMaker.spageNo - 1)}')">&LT;</span>&nbsp;
			</c:when>
			<c:otherwise>
				<font color="Gray">FP&nbsp;&LT;&nbsp;&nbsp;</font>
			</c:otherwise>
		</c:choose>
		<!-- 2) Display PageNo 
	=> currPage 제외한 PageNo 만 a Tag 적용 -->
		<c:forEach var="i" begin="${pageMaker.spageNo}" end="${pageMaker.epageNo}">
			<c:if test="${i==pageMaker.cri.currentPage}">
				<font color="red" size="5"><b>${i}</b></font>&nbsp;
  			</c:if>
			<c:if test="${i!=pageMaker.cri.currentPage}">
				<span class="textlink" onclick="axiMListCri('${pageMaker.makeQuery(i)}')">${i}</span>&nbsp;
  			</c:if>
		</c:forEach>
		<!-- 3) Next, LastPage  -->
		<c:choose>
			<c:when test="${pageMaker.next && pageMaker.epageNo>0}">&nbsp;
				<span class="textlink" onclick="axiMListCri('${pageMaker.makeQuery(pageMaker.epageNo+1)}')">&GT;</span>&nbsp;
				<span class="textlink" onclick="axiMListCri('${pageMaker.makeQuery(pageMaker.lastPageNo)}')">LP</span>&nbsp;
			</c:when>
			<c:otherwise>
				<font color="Gray">&nbsp;&GT;&nbsp;LP</font>
			</c:otherwise>
		</c:choose>
	</div>

	<hr>
	<a href="/home"> Home </a>
	<a href="/javascript:history.go(-1)"> 이전으로 </a>

</body>
</html>