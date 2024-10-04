<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/resources/myLib/myStyle.css">

<meta charset="UTF-8">
<title>home Spring 3 JPA</title>
</head>
<body>
	<h1>SpringBoot 3 JPA</h1>
	<p>Home_Time : ${requestScope.serverTime}</p>
	<hr>
	
	<a href="user/userList">userList</a>&nbsp;
	<a href="product/productList">productList</a>
	<a href="product/productJoinList">productJoinList</a>

	<br>
	<a href="bcrypt">BCrypt</a>
	<br>
	<a href="member/memberList">Mlist</a>
	<br>
	<a href="team/joList2">joinlist</a>
	<br>
	<a href="member/joindsl">joinDSL</a>
	<hr>
	<a href="/ginsert">GInsert</a> &nbsp;
	<a href="/glist">GList</a> &nbsp;
	<a href="/gupdate">GUpdate</a> &nbsp;
	<a href="/gpage?pageNo=2&sizeNo=3">GPage</a> &nbsp;
	<hr>
	<a href="/tsave">TSave</a> &nbsp;
	<a href="/tupdate">TUpdate</a> &nbsp;
	<a href="/tdupupdate?id=beom&no=10&name=승범&count=4">TDupUpdate</a> &nbsp;
	<a href="/tcalc">TCalc</a> &nbsp;
	<a href="/tlist">TList</a> &nbsp;
	<hr>

	<img alt="왜 안나오냐" src="./resources/images/bg2.jpg" width="400"
		height="600">
</body>
</html>