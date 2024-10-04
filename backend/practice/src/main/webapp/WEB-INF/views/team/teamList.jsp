<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring TeamList</title>
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
	<table border="1" , style="width: 100%">
		<tr style="background-color: aquamarine;">
			<th>teamno</th>
			<th>teamname</th>
			<th>captain</th>
			<th>captainName</th>
			<th>project</th>
			<th>slogan</th>
		</tr>
		<c:out value="${requestScope.joinTest }" />
		<c:if test="${not empty requestScope.joinTest }">
			<c:forEach var="joinlist" items="${requestScope.joinTest }">
				<tr>
					<td><a href="teamDetail?jCode=D&teamno=${joinlist.teamno}">${joinlist.teamno}</a></td>
					<td>${joinlist.teamname}</td>
					<td>${joinlist.captain}</td>
					<td>${joinlist.name}</td>
					<td>${joinlist.project}</td>
					<td>${joinlist.slogan}</td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.joinTest }">
			<tr>
				<td colspan="9">데이터가 없지롱</td>
			</tr>
		</c:if>
	</table>
	<hr>
	<a href="/home"> Home </a>
	<a href="/javascript:history.go(-1)"> 이전으로 </a>

</body>
</html>