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
                <li><a href="<c:url value='/userList' />">유저 리스트 출력</a></li>
                <li><a href="adminproduct/productList">상품 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/codeTable' />">코드테이블 등록/수정/삭제</a></li>
                <li><a href="adminreview/reviewanswer">리뷰답변달기</a></li>
                <li><a href="statistics/statisticsList">통계</a></li>
            </ul>
        </div>

        <!-- Content -->
        <div class="content">
            <h1>Admin Dashboard</h1>

            <!-- User List Table -->
            <h2>User List</h2>
            <table class="user-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Login ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="user" items="${userList}">
                        <tr>
                            <td>${user.user_id}</td>
                            <td>${user.login_id}</td>
                            <td>${user.user_name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone_num}</td>
                            <td>
                                <a href="<c:url value='/user/edit/${user.user_id}' />">수정</a> |
                                <a href="<c:url value='/user/delete/${user.user_id}' />" onclick="return confirm('정말로 삭제하시겠습니까?');">삭제</a>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
