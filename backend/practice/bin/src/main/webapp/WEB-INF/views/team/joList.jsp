<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** TeamList Spring_Boot Mybatis **</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/myStyle.css">
</head>
<body>
	<h2>** TeamList Spring_Boot Mybatis **</h2>
	<br>
	<c:if test="${not empty message}">
	${message}<br>
	</c:if>
	<hr>
	<table width=100%>
		<tr bgcolor="Gold" height="30">
			<th>Teamno</th>
			<th>TeamName</th>
			<th>CaptainID</th>
			<th>Project</th>
			<th>Slogan</th>
		</tr>
		<c:if test="${not empty jolist}">
			<c:forEach var="jolist" items="${jolist}">
				<tr height="30">
					<td><a href="detail?jCode=D&jno=${jolist.teamno}">${jolist.teamno}</a></td>
					<td>${jolist.teamname}</td>
					<td>${jolist.captain}</td>
					<td>${jolist.project}</td>
					<td>${jolist.slogan}</td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.jolist}">
			<tr>
				<td colspan="6">~~ 출력자료가 1건도 없습니다. ~~</td>
			</tr>
		</c:if>
	</table>
	<hr>
	<hr>
	&nbsp;
	<a href="teamInsert">조등록</a>&nbsp; &nbsp;
	<a href="javascript:history.go(-1)">이전으로</a>&nbsp; &nbsp;
	<a href="/home">[Home]</a>
</body>
</html>