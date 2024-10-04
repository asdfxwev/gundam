<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MVC2 StudentDetail</title>
</head>
<body>
	<table>
		<c:if test="${not empty requestScope.memberdto}">
			<tr height="40">
				<th bgcolor="aqua">id</th>
				<td>${requestScope.memberdto.id}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">password</th>
				<td>${requestScope.memberdto.password}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">name</th>
				<td>${requestScope.memberdto.name}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">age</th>
				<td>${requestScope.memberdto.age}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">teamno</th>
				<td>${requestScope.memberdto.teamno}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">info</th>
				<td>${requestScope.memberdto.info}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">point</th>
				<td>${requestScope.memberdto.point}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">birthday</th>
				<td>${requestScope.memberdto.birthday}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">rid</th>
				<td>${requestScope.memberdto.rid}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">image</th>
				<td><image alter="myimage" width="50" height="75"
							src="/resources/uploadimages/${requestScope.memberdto.uploadfile}"> </image></td>
			</tr>
		</c:if>
		<c:if test="${empty requestScope.memberdto }">
			<tr>
				<td colspan="9">데이터가 없지롱</td>
			</tr>
		</c:if>
	</table>
	<a href="/home"> Home </a>
	<a href="/javascript:history.go(-1)"> 이전으로 </a>
</body>
</html>