<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Board Update Spring_Boot Mybatis**</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/myStyle.css">
<style>
.fixed {
	resize: none
}
</style>
</head>
<body>
	<h2>** Board Update Spring_MVC2 **</h2>
	<hr>
	<form action="update" method="Post">
		<table>
			<tr height="40">
				<td bgcolor="Linen">seq</td>
				<td><input type="text" name="seq" value="${boardOne.seq}"
					size="20" readonly></td>
			</tr>
			<tr height="40">
				<td bgcolor="Linen">ID</td>
				<td><input type="text" name="id" value="${boardOne.id}"
					size="20" readonly></td>
			</tr>
			<tr height="40">
				<td bgcolor="Linen">title</td>
				<td><input type="text" name="title" value="${boardOne.title}"
					size="20" ></td>
			</tr>
			<tr height="40">
				<td bgcolor="Linen">Content</td>
				<td><textarea name="content" rows="10" cols="50" onresize="none" class="fixed">${boardOne.content }</textarea></td>
			</tr>
			<tr height="40">
				<td bgcolor="Linen">regDate</td>
				<td><input type="text" name="regdate" value="${boardOne.regdate}"
					size="20" readonly></td>
			</tr>
			<tr height="40">
				<td bgcolor="Linen">cnt</td>
				<td><input type="text" name="cnt" value="${boardOne.cnt}"
					size="20" readonly></td>
			</tr>
			<%-- 			<tr height="40">
				<td bgcolor="Linen">Project</td>
				<td><input type="text" name="project" value="${boardOne.project}"
					size="20"></td>
			</tr>
			<tr height="40">
				<td bgcolor="Linen">Slogan</td>
				<td><input type="text" name="slogan" value="${boardOne.slogan}"
					size="20"></td>
			</tr> --%>
			<tr>
				<td></td>
				<td><input type="submit" value="수정">&nbsp;&nbsp; <input
					type="reset" value="취소"></td>
			</tr>
		</table>
	</form>
	<c:if test="${not empty message}">
		<hr>
${message}<br>
	</c:if>
	<hr>
	<c:if test="${not empty loginID}">
	&nbsp;&nbsp;<a href="delete?jno=${apple.jno}">[조삭제]</a>
	</c:if>
	&nbsp;&nbsp;
	<a href="joList">joList</a> &nbsp;&nbsp;
	<a href="javascript:history.go(-1)">이전으로</a> &nbsp;&nbsp;
	<a href="/home">[Home]</a>
</body>
</html>