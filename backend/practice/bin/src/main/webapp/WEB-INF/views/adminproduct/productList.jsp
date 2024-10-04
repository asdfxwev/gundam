<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>Product Table</title>
<style>
/* 그리드 컨테이너 설정 */
.grid-container {
	display: grid;
	grid-template-columns: repeat(10, 1fr); 
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
	<h1>Product Table</h1>
	<a href="/adminproduct/productInsert">상품추가</a>

	<div class="grid-wrapper">
		<div class="grid-container">
			<div class="grid-item grid-header">상품이름</div>
			<div class="grid-item grid-header">가격</div>
			<div class="grid-item grid-header">재고</div>
			<div class="grid-item grid-header">등록일</div>
			<div class="grid-item grid-header">브랜드</div>
			<div class="grid-item grid-header">카테고리</div>
			<div class="grid-item grid-header">품절유무</div>
			<div class="grid-item grid-header">이미지</div>
			<div class="grid-item grid-header">수정</div>
			<div class="grid-item grid-header">삭제</div>
		</div>

		<c:if test="${not empty productJoinList}">
			<div id="grid-data" class="grid-container">
				<c:forEach var="productJoinList" items="${productJoinList}">
					<div class="grid-item">${productJoinList.pro_name}</div>
					<div class="grid-item">${productJoinList.pro_price}</div>
					<div class="grid-item">${productJoinList.pro_stock}</div>
					<div class="grid-item">${productJoinList.pro_creat}</div>
					<div class="grid-item">${productJoinList.cate_brand}</div><!-- 브랜드 -->
					<div class="grid-item">${productJoinList.cate_piece}</div><!-- 카테고리 -->
					<div class="grid-item">${productJoinList.pro_state_cd}</div><!-- 품절유무 -->
					<div class="grid-item"><img alt="productImg" src="/resources/productImg/${productJoinList.pro_id}/${productJoinList.pro_imgs}"> </div>
					<div class="grid-item"><a href="/adminproduct/productModify?proId=${productJoinList.pro_id}">수정</a></div>
					
					<div class="grid-item">
    					<form action="/product/productDelete?proId=${productJoinList.pro_id}" method="post">
        					<button type="submit">삭제</button>
    					</form>
					</div>
					
				</c:forEach>
			</div>
		</c:if>
	</div>

</body>
</html>

