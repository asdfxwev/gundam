<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>User Table</title>
<style>
/* 그리드 컨테이너 설정 */
.grid-container {
	display: grid;
	grid-template-columns: repeat(10, 1fr); /* 14개의 열 */
	gap: 10px;
	background-color: #f2f2f2;
	padding: 10px;
}

/* 그리드 항목 설정 */
.grid-item {
	background-color: white;
	border: 1px solid #ddd;
	padding: 8px;
	text-align: center;
	font-size: 14px;
}

/* 제목을 위한 스타일 */
.grid-header {
	font-weight: bold;
	background-color: #333;
	color: white;
}

/* 전체 그리드 컨테이너 스타일 */
.grid-wrapper {
	margin: 20px auto;
	width: 95%;
	max-width: 1200px;
}
</style>
</head>
<body>
	<h1>User Table</h1>

	<div class="grid-wrapper">
		<!-- 그리드의 헤더 -->
		<div class="grid-container">
			<div class="grid-item grid-header">ID</div>
			<div class="grid-item grid-header">이름</div>
			<div class="grid-item grid-header">이메일</div>
			<div class="grid-item grid-header">생년월일</div>
			<div class="grid-item grid-header">성별</div>
			<div class="grid-item grid-header">핸드폰 번호</div>
			<div class="grid-item grid-header">우편번호</div>
			<div class="grid-item grid-header">주소</div>
			<div class="grid-item grid-header">생성 날짜</div>
			<div class="grid-item grid-header">최근 접속 날짜</div>
		</div>

		<!-- 서버에서 가져온 데이터가 여기에 추가됩니다 -->
		<c:if test="${not empty userList}">
			<div id="grid-data" class="grid-container">
				<c:forEach var="userList" items="${userList}">
					<div>${userList.login_id}</div>
					<div>${userList.user_name}</div>
					<div>${userList.email}</div>
					<div>${userList.birth}</div>
					<div>${userList.gender}</div>
					<div>${userList.phone_num}</div>
					<div>${userList.postcode}</div>
					<div>${userList.address}${userList.dtl_address}</div>
					<div>${userList.user_creat}</div>
					<div>${userList.lastcon_dtm}</div>
				</c:forEach>
			</div>
		</c:if>
	</div>


</body>
</html>