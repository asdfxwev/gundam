<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>boardList</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/myStyle.css">
<style>
* {
	/* text-align: center; */
}
</style>
</head>
<body>
	<h2>** Spring_Boot Mybatis BoardList **</h2>
	<hr>
	<c:if test="${!empty requestScope.message}">
 ${requestScope.message}<br>
		<hr>
	</c:if>
	<table style="width: 100%">
		<tr bgcolor="aquamarine">
			<th>Seq</th>
			<th>Title</th>
			<th>ID</th>
			<th>RegDate</th>
			<th>조회수</th>
		</tr>
		<c:if test="${! empty  requestScope.boardList}">
			<c:forEach var="boardList" items="${requestScope.boardList }">
				<tr>
					<td>${boardList.seq }</td>

					<!-- 답글등록 후 들여쓰기가 필요하다  -->
					<td><c:if test="${boardList.indent > 0}">
							<c:forEach begin="1" end="${boardList.indent}">
								<span>&nbsp;&nbsp;</span>
							</c:forEach>
							<span style="color:black"> re... </span>
						</c:if> <c:if test="${not empty sessionScope.loginId }">
							<a href="detail?jCode=D&seq=${boardList.seq}">${boardList.title }</a>
						</c:if> <c:if test="${empty sessionScope.loginId }">
						${boardList.title }
					</c:if></td>
					<td>${boardList.id }</td>
					<td>${boardList.regdate }</td>
					<td>${boardList.cnt }</td>
				</tr>
			</c:forEach>
		</c:if>

		<c:if test="${empty requestScope.boardList }">
			<tr>
				<td colspan="6">자료 없다 새꺄</td>
			</tr>
		</c:if>


	</table>
	<hr>
	&nbsp;
	<c:if test="${not empty sessionScope.loginId}">
		<a href="boardInsert">추가하기</a>&nbsp; &nbsp;
		</c:if>
	<a href="/home">Home</a>&nbsp; &nbsp;
	<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
</body>
</html>