<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>Product Select Table</title>
<style>
/* 그리드 컨테이너 설정 */
.grid-container {
	display: grid;
	grid-template-columns: repeat(8, 1fr); 
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
	<h1>Product Select Table</h1>

	<div class="grid-wrapper">
		<!-- 그리드의 헤더 -->
		<div class="grid-container">
			<div class="grid-item grid-header">상품아이디</div>
			<div class="grid-item grid-header">상품이름</div>
			<div class="grid-item grid-header">세부내용</div>
			<div class="grid-item grid-header">가격</div>
			<div class="grid-item grid-header">건담 or 포켓몬</div>
			<div class="grid-item grid-header">카테고리</div>
			<div class="grid-item grid-header">브랜드</div>
			<div class="grid-item grid-header">품절유무</div>
		</div>

		<c:if test="${not empty productJoinList}">
			<div id="grid-data" class="grid-container">
				<c:forEach var="product" items="${productJoinList}">
					<div class="grid-item">${product.pro_id}</div>
					<div class="grid-item">${product.pro_name}</div>
					<div class="grid-item">${product.pro_des}</div>
					<div class="grid-item">${product.pro_price}</div>
					<div class="grid-item">${product.pro_cate}</div>
					<div class="grid-item">${product.cate_brand}</div>
					<div class="grid-item">${product.cate_piece}</div>
					<div class="grid-item">${product.pro_state_cd}</div>
				</c:forEach>
			</div>
		</c:if>
	</div>

</body>
</html>

