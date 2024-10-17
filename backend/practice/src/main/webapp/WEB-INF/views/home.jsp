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
        <!-- Sidebar -->
        <div class="sidebar">
            <h2>관리자 페이지</h2>
            <ul>
                <li><a href="<c:url value='/home' />">유저 리스트 출력</a></li>
                <li><a href="<c:url value='/adminproduct/productList'/>">상품 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/adminreview/reviewanswer'/>">리뷰답변달기</a></li>
                <li><a href="<c:url value='/statistics/statisticsList'/>">통계</a></li>
            </ul>
        </div>

        <!-- Content -->
        <div class="content">
            <h1>Admin Dashboard</h1>
            
            <!-- Search Bar -->
            <div class="search-container">
                <form action="/user/home" method="GET">
                    <input type="text" name="inputValue" placeholder="이름, 로그인 아이디 검색" value="${param.inputValue}">
                    <button type="submit">검색</button>
                </form>
            </div>

            <!-- User List Table -->
            <h2>User List</h2>
            <table class="user-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Login ID</th>
                        <th>이름</th>
                        <th>Email</th>
                        <th>연락처</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                	<c:if test="${!empty UserList }">
	                    <c:forEach var="user" items="${UserList}">
	                        <tr>
	                            <td>${user.user_id}</td>
	                            <td>${user.login_id}</td>
	                            <td>${user.user_name}</td>
	                            <td>${user.email}</td>
	                            <td>${user.phone_num}</td>
	                            <td>${user.user_cd}</td>
	                            <td>
	                                <a href="<c:url value='/user/edit/${user.user_id}' />">수정</a>
	                            </td>
	                        </tr>
	                    </c:forEach>
	                </c:if>
					<c:if test="${empty UserList}">
	   					<tr>
	        				<td colspan="7">검색된 사용자가 없습니다.</td>
	    				</tr>
					</c:if>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
