<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title> login form </title>
</head>
<body>
<h2> SPRING Login Form </h2>
<form action="login" method="post">
<table>
	<tr height="40"><td bgcolor="aquamarine"><label for="id">Id</label></td>
		<td><input type="text" id="id" name="id"></td>
	</tr>
	<tr height="40"><td bgcolor="aqua"><label for="password">Password</label></td>
		<td><input type="password" id="password" name="password"></td>
	</tr>
	<tr height="40"><td></td>
		<td><input type="submit" value="로그인">&nbsp;&nbsp;
			<input type="reset" value="취소">
		</td>
	</tr>
</table>
</form>
<hr>
 <%	if ( request.getAttribute("message") !=null ) {
	// message 출력 %>
	=> <%=request.getAttribute("message")%>
<%	} %> 
<br>
JSTL 적용하기 
<c:if test="${not empty requestScope.message}">
${requestScope.message}<br>
</c:if>	
</body>
</html>