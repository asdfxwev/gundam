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
                <li><a href="<c:url value='/productList' />">상품 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/codeTable' />">코드테이블 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/notice' />">공지사항 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/faq' />">FAQ 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/statistics' />">통계</a></li>
            </ul>
        </div>

       <%--  <!-- Content -->
        <div class="data">
    <div class="data-summary">
        <dl>
            <dt>오늘 작성글</dt>
            <dd>${countToday}</dd>
        </dl>
        <dl>
            <dt>어제 작성글</dt>
            <dd>${countYesterday}</dd>
        </dl>
        <dl>
            <dt>누적 작성글</dt>
            <dd>${countTotal}</dd>
        </dl>
    </div>

    <div class="data-summary">
        <dl>
            <dt style="color: red;">자유 게시판</dt>
            <dd>${countNone}</dd>
        </dl>
        <dl>
            <dt style="color: orange;">비밀 게시판</dt>
            <dd>${countSecret}</dd>
        </dl>
        <dl>
            <dt style="color: green;">스크린샷 게시판</dt>
            <dd>${countScreenshot}</dd>
        </dl>
        <dl>
            <dt style="color: purple;">질문과 답변</dt>
            <dd>${countQuestion}</dd>
        </dl>
    </div><br><br>

    <div class="chart-title">최근 7일 통계</div>
    <div id="Line_Controls_Chart">
        <!-- 라인 차트 생성할 영역 -->
        <div id="lineChartArea" class="chart"></div>
        <!-- 컨트롤바를 생성할 영역 -->
        <div id="controlsArea" style="display: none;"></div>
    </div>
            <div>
                <a class="back-link" href="<c:url value='/api/orders' />">주문 목록으로 돌아가기</a>
            </div>
        </div> --%>
    </div>
</body>
</html>
