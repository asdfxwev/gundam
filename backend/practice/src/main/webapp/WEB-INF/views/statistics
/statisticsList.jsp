<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>주문 통계</title>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/styles.css' />">
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

        .stats-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .stats-table th, .stats-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .stats-table th {
            background-color: #f2f2f2;
        }

        .back-link {
            margin-top: 20px;
            display: inline-block;
            text-decoration: none;
            color: #3498db;
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
        <!-- Content -->
        <div class="content">
            <h1>Admin product</h1>

            <!-- User List Table -->
            <h2>User List</h2>
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
				<c:forEach var="orderList" items="${orderList}">
                        <tr>
                            <td>${orderList.order_id}</td>
                            <td>${orderList.pro_name}</td>
                            <td>${orderList.pro_name}</td>
                            <td>${orderList.pro_name}</td>
                            <td>${orderList.pro_name}</td>
                    
                            <td><img alt="productImg" src="/resources/productImg/${productJoinList.pro_id}/${productJoinList.pro_imgs}"></td>
                            <td>${user.phone_num}</td>
                            <td>
                                <a href="/adminproduct/productModify?proId=${productJoinList.pro_id}">수정</a> |
                                <a href="/product/productDelete?proId=${productJoinList.pro_id}" onclick="return confirm('정말로 삭제하시겠습니까?');">삭제</a>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
            <div>
                <a class="back-link" href="<c:url value='/api/orders' />">주문 목록으로 돌아가기</a>
            </div>
        </div>
    </div>
</body>
</html>