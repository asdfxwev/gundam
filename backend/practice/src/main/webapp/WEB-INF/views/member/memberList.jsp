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

/* tr {
	background-color: aquamarine;
} */
</style>
</head>
<body>
	<table border="1" , style="width: 100%">
		<tr style="background-color: aquamarine;">
			<th>id</th>
			<th>password</th>
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
					<td>${memberlist.password}</td>
					<td>${memberlist.name}</td>
					<td>${memberlist.age}</td>
					<td>${memberlist.teamno}</td>
					<td>${memberlist.info}</td>
					<td>${memberlist.point}</td>
					<td>${memberlist.birthday}</td>
					<td>${memberlist.rid}</td>
					<td> <image alter="myimage" width="50" height="75" 
					src="/resources/uploadimages/${memberlist.uploadfile}">    </image> </td>
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
	<a href="/home"> Home </a>
	<a href="/javascript:history.go(-1)"> 이전으로 </a>

</body>
</html>