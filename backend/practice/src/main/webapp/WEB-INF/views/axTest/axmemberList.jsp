<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring axios MemberList</title>
<style>
* {
	font-size: 1.5rem;
	color: aqua;
	font-weight: bold;
	text-align: center;
}

/* tr {
	background-color: aquamarine;
} */
</style>
</head>
<body>
	<h2>axios memberlist</h2>
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
			<th>삭제</th>
		</tr>
		<c:if test="${not empty requestScope.memberlist }">
			<c:forEach var="memberlist" items="${requestScope.memberlist }">
				<tr>
					<!-- idbList: id별 boardList
					- 선택된 id를 function에 전달(매개변수를 활용)
					idbList('memberlist') 
					idbList({memberlist.id) -> idbList('memberlist') : memberlist라는 변수를 찾음 
					idbList('${memberlist.id}')처럼 따음표를 붙여줘야 한다.
					
					a Tag에 이벤트 적용시 책갈피 기능 활용
					 - href : 적용하지 않음(이동하지 않음)
					 - href="#id" : id 위치로 이동, "#" : 최상단으로 이동
					 - href="javascript:;" : 이동하지 않음
					-->
					<td><a href="#resultArea2" onclick="idbList('${memberlist.id}')">${memberlist.id}</a></td>
					<td>${memberlist.name}</td>
					<td>${memberlist.age}</td>
					<td onmouseover="aximouseover(event, `${memberlist.teamno}`)" onmouseout="aximouseout()">${memberlist.teamno}</td>
					<td id='${memberlist.teamno}'>${memberlist.info}</td>
					<td>${memberlist.point}</td>
					<td>${memberlist.birthday}</td>
					<td>${memberlist.rid}</td>
					<td> <image alter="myimage" width="50" height="75" 
					src="/resources/uploadimages/${memberlist.uploadfile}"></image></td>
					<!--
					Delete 기능 추가
					- 선택된 id를 function에 전달(매개변수 활용)
					- 결과는 성공과 실패 여부만 전달 : RESTController로
					- 성공 : Deleted로 변경, onclick 이벤트 해제 / 이를 통해 Delete Tag를 function에서 인식할 수 있어야 함
					
					function 에 이벤트객체 전달
            		이벤트핸들러의 첫번째 매개변수에 event 라는 이름으로 전달함.
             		a Tag 와 span 사용시 e.target 값 비교
                 	a Tag : "javascript:;" 
                 	span  : [object HTMLSpanElement]          
        			-->
					
					<td><span class="textlink" onclick="axiDelete(event, '${memberlist.id}')" id='${memberlist.id}' >delete</span></td> 
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.memberlist }">
			<tr>
				<td colspan="9">데이터가 없지롱</td>
			</tr>
		</c:if>
	</table>
	<div id="content" ></div>
	<hr>
	<a href="/home"> Home </a>
	<a href="/javascript:history.go(-1)"> 이전으로 </a>

</body>
</html>