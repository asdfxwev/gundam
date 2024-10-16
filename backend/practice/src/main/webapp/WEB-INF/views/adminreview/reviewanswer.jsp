<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>리뷰 페이지</title>
<style>
body {
	font-family: Arial, sans-serif;
	margin: 0;
	padding: 0;
}

.container {
	display: grid;
	grid-template-columns: 250px 1fr;
	height: 100vh;
}

.sidebar {
	background-color: #2c3e50;
	padding: 20px;
	color: white;
}

.sidebar h2 {
	color: #ecf0f1;
}

.sidebar ul {
	list-style-type: none;
	padding: 0;
}

.sidebar ul li {
	margin: 15px 0;
}

.sidebar ul li a {
	color: #ecf0f1;
	text-decoration: none;
}

.sidebar ul li a:hover {
	color: #3498db;
}

.review-container {
	margin-bottom: 20px;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}

.review-title {
	font-weight: bold;
	font-size: 1.2em;
}

.review-content {
	margin: 10px 0;
}

.answer-form {
	margin-top: 10px;
}

.answer-input {
	width: 100%;
	padding: 8px;
	margin: 5px 0;
}

.submit-answer {
	padding: 8px 12px;
	background-color: #3498db;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}
</style>
</head>
<body>

	<div class="container">
		<!-- Sidebar -->
		<div class="sidebar">
			<h2>관리자 페이지</h2>
			<ul>
                <li><a href="<c:url value='/userList' />">유저 리스트 출력</a></li>
                <li><a href="<c:url value='/adminproduct/productList'/>">상품 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/adminreview/reviewanswer'/>">리뷰답변달기</a></li>
                <li><a href="<c:url value='/statistics/statisticsList'/>">통계</a></li>
			</ul>
		</div>

		<div class="review-container">
			<c:forEach var="review" items="${reviewList}">
				<div class="review-title">리뷰 제목 : ${review.rev_title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;상품이름 : ${review.product.pro_name}</div>
				<div class="review-content">리뷰 내용 : ${review.rev_com}</div>

				<h4>답변:</h4>

				<div class="answer-form">
					<form
						action="${pageContext.request.contextPath}/adminreview/reviewanswer"
						method="post">
						<input type="hidden" name="rev_id" value="${review.rev_id}" />
						<textarea class="answer-input" name="rev_answer"
							placeholder="답변을 입력하세요..." required></textarea>
						<button type="submit" class="submit-answer">답변하기</button>
					</form>
				</div>
				<hr>
			</c:forEach>
		</div>
	</div>
</body>
</html>
