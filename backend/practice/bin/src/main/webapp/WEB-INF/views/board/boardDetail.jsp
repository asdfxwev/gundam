<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Board Detail Spring_Boot Mybatis **</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/myStyle.css">
</head>
<body>
	<h2>** Board Detail Spring_Boot Mybatis **</h2>
	<hr>
	<c:if test="${not empty requestScope.boardOne}">
		<table>
			<tr height="40">
				<td bgcolor="Lavender">seq</td>
				<td>${boardOne.seq}</td>
			</tr>
			<tr height="40">
				<td bgcolor="Lavender">id</td>
				<td>${boardOne.id}</td>
			</tr>
			<tr height="40">
				<td bgcolor="Lavender">title</td>
				<td>${boardOne.title}</td>
			</tr>
			<tr height="40">
				<td bgcolor="Lavender">content</td>
				<td>${boardOne.content}</td>
			</tr>
			<tr height="40">
				<td bgcolor="Lavender">regdate</td>
				<td>${boardOne.regdate}</td>
			</tr>
			<tr height="40">
				<td bgcolor="Lavender">조회수</td>
				<td>${boardOne.cnt}</td>
			</tr>
		</table>
	</c:if>
	<c:if test="${empty requestScope.boardOne}">
		<hr>
	~~ 출력할 자료가 없습니다. ~~<br>
	</c:if>
	</table>

	<hr>
	<c:if test="${not empty message}">
	${message}<br>
	</c:if>
	<hr>
	&nbsp;
	<c:if test="${sessionScope.loginId == requestScope.boardOne.id }">
		<a href="detail?jCode=U&seq=${boardOne.seq}">수정하기</a>&nbsp; &nbsp;
		<a href="delete?seq=${boardOne.seq}&root=${boardOne.root}">삭제하기</a>&nbsp; &nbsp;
	</c:if>
	<hr>
<!-- 	답글 : 부모글의 root, step, indent값이 필요하기 때문에
	Query String으로 서버로 보내줌  -->
	<c:if test="${not empty sessionScope.loginId }">
		&nbsp;<a href="boardInsert">새글추가</a>&nbsp; &nbsp;
		<a href="replyInsert?root=${boardOne.root}&step=${boardOne.step}&indent=${boardOne.indent}">답글달기</a>&nbsp; &nbsp;
	</c:if>
	<hr>
	<br> &nbsp;
	<a href="boardList">boardList</a>&nbsp; &nbsp;
	<a href="javascript:history.go(-1)">이전으로</a>&nbsp; &nbsp;
	<a href="/home">[Home]</a>&nbsp;
</body>
</html>