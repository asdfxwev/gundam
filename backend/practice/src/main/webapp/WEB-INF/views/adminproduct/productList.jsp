<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>관리자 페이지</title>
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

        .content {
            padding: 20px;
        }

        h1, h2 {
            margin-bottom: 20px;
        }

        .search-container {
            margin-bottom: 20px;
        }

        .search-container form {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .search-container input[type="text"] {
            width: 300px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 10px;
        }

        .search-container button {
            padding: 8px 16px;
            background-color: #3498db;
            border: none;
            color: white;
            border-radius: 4px;
            cursor: pointer;
        }

        .search-container button:hover {
            background-color: #2980b9;
        }

        .user-table {
            width: 100%;
            border-collapse: collapse;
        }

        .user-table th, .user-table td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .user-table th {
            background-color: #f2f2f2;
        }

        .user-table td a {
            color: #3498db;
            text-decoration: none;
        }

        .user-table td a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="sidebar">
            <h2>관리자 페이지</h2>
            <ul>
                <li><a href="<c:url value='/userList' />">유저 리스트 출력</a></li>
                <li><a href="productList">상품 등록/수정/삭제</a></li>
                <li><a href="">코드테이블 등록/수정/삭제</a></li>
            </ul>
        </div>

        <div class="content">
            <h1>Admin product</h1>

            <!-- Search Bar -->
            <div class="search-container">
                <form action="/adminproduct/productList" method="GET">
                    <input type="text" name="inputValue" placeholder="상품 이름, 브랜드, 카테고리 등 검색">
                    <button type="submit">검색</button>
                </form>
            </div>

            <!-- User List Table -->
            <h2>Product List</h2>
            <table class="user-table">
                <thead>
                    <tr>
                        <th>상품이름</th>
                        <th>가격</th>
                        <th>재고</th>
                        <th>등록일</th>
                        <th>브랜드</th>
                        <th>카테고리</th>
                        <th>품절유무</th>
                        <th>이미지</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="productJoinList" items="${productJoinList}">
                        <tr>
                            <td>${productJoinList.pro_name}</td>
                            <td>${productJoinList.pro_price}</td>
                            <td>${productJoinList.pro_stock}</td>
                            <td>${productJoinList.pro_creat}</td>
                            <td>${productJoinList.cate_brand}</td>
                            <td>${productJoinList.cate_piece}</td>
                            <td>${productJoinList.pro_state_cd}</td>
                            <td><img width="50" alt="productImg" src="/resources/productImg/${productJoinList.pro_id}/${productJoinList.pro_imgs}"></td>
                            <td>
                                <a href="/adminproduct/productModify?proId=${productJoinList.pro_id}">수정</a> |
                                <a href="/product/productDelete?proId=${productJoinList.pro_id}" onclick="return confirm('정말로 삭제하시겠습니까?');">삭제</a>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <div align="center">
		<c:choose>
			<c:when test="${pageMaker.prev && pageMaker.spageNo>1}">
				<a href="${pageMaker.makeQuery(1)}">FP</a>&nbsp;
				<a href="${pageMaker.makeQuery(pageMaker.spageNo - 1)}">&LT;</a>&nbsp;&nbsp;  
			</c:when>
			<c:otherwise>
				<font color="Gray">FP&nbsp;&LT;&nbsp;&nbsp;</font>
			</c:otherwise>
		</c:choose>
		<!-- 2) Display PageNo 
	=> currPage 제외한 PageNo 만 a Tag 적용 -->
		<c:forEach var="i" begin="${pageMaker.spageNo}"
			end="${pageMaker.epageNo}">
			<c:if test="${i==pageMaker.cri.currentPage}">
				<font color="red" size="5"><b>${i}</b></font>&nbsp;
  			</c:if>
			<c:if test="${i!=pageMaker.cri.currentPage}">
				<a href=" ${ pageMaker.makeQuery(i)}">${i}</a>&nbsp;
  			</c:if>
		</c:forEach>
		<!-- 3) Next, LastPage  -->
		<c:choose>
			<c:when test="${pageMaker.next && pageMaker.epageNo>0}">
  		&nbsp;<a href="${ pageMaker.makeQuery(pageMaker.epageNo+1)}">&GT;</a>
  		&nbsp;<a href="${ pageMaker.makeQuery(pageMaker.lastPageNo)}">LP</a>
			</c:when>
			<c:otherwise>
				<font color="Gray">&nbsp;&GT;&nbsp;LP</font>
			</c:otherwise>
		</c:choose>
	</div>
    </div>
</body>
</html>
