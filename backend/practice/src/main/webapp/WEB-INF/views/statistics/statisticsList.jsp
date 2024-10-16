<%@ page contentType="text/html; charset=UTF-8" language="java" %>
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

        .hidden {
            display: none;
        }
    </style>
    <script>
    	
    	window.onload = function() {
        	const endDateInput = document.getElementById('endDate');
	        const startDateInput = document.getElementById('startDate');
	        console.log(startDateInput);

        	const today = new Date();
        	const priorDate = new Date();
        	priorDate.setDate(today.getDate() - 30);
        	console.log(today);

    	    const formattedToday = today.toISOString().split('T')[0];
	        const formattedPriorDate = priorDate.toISOString().split('T')[0];

        	endDateInput.value = formattedToday;
        	startDateInput.value = formattedPriorDate;
        	console.log(endDateInput.value);
    	};
    	
    
         function toggleStats() {
            const selectedValue = document.getElementById("statsOption").value;
            const monthlySection = document.getElementById("monthlyStatsSection");
            const genderSection = document.getElementById("genderStatsSection");

            if (selectedValue === "monthly") {
                monthlySection.classList.remove("hidden");
                genderSection.classList.add("hidden");
            } else {
                monthlySection.classList.add("hidden");
                genderSection.classList.remove("hidden");
            }
        }


    </script>
</head>
<body>
    <div class="container">
        <div class="sidebar">
            <h2>관리자 페이지</h2>
            <ul>
                <li><a href="<c:url value='/userList' />">유저 리스트 출력</a></li>
                <li><a href="<c:url value='/adminproduct/productList'/>">상품 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/adminreview/reviewanswer'/>">리뷰답변달기</a></li>
                <li><a href="<c:url value='/statistics/statisticsList'/>">통계</a></li>
            </ul>
        </div>

        <div class="content">
            <h1>주문 통계</h1>
            <label for="statsOption">통계 선택:</label>
            <select id="statsOption" onchange="toggleStats()">
                <option value="monthly">주문 통계</option>
                <option value="gender">성별 주문 통계</option>
            </select>

            <!-- 월별 주문 통계 섹션 -->
			<div id="monthlyStatsSection" class="">
			    <h2>주문 통계</h2>
			    <div>
			        <label for="startDate">시작 날짜:</label>
			        <input type="date" id="startDate" name="startDate">
			        
			        <label for="endDate">종료 날짜:</label>
			        <input type="date" id="endDate" name="endDate">
			        
			        <button id="searchButton" onclick="fetchDateStats()">검색</button>
			    <h2>주문 통계</h2>	
			    <div>
					<form action="/statistics/statisticsList" method="POST">
						<c:forEach items="${codecate }" var="codecate">
							<label><input name="pro_cate" type="checkbox" value="${codecate.code_id}">${codecate.code_name }</label>
						</c:forEach>
						<br>
						<c:forEach var="codebrand" items="${codebrand}">
							<label><input name="cate_brand" type="checkbox" value="${codebrand.code_id}">${codebrand.code_name}</label>
						</c:forEach>
						<br>
						<c:forEach var="codepiece" items="${codepiece}">
							<label><input name="cate_piece" type="checkbox" value="${codepiece.code_id}">${codepiece.code_name}</label>
						</c:forEach>
						<br>
    					<label for="startDate">시작 날짜:</label>
    					<input type="date" id="startDate" name="startDate">
    
    					<label for="endDate">종료 날짜:</label>
    					<input type="date" id="endDate" name="endDate">
    
					    <button type="submit">검색</button>
					</form>
			           <!--             <form action="/adminproduct/productList" method="GET">
                    <input type="text" name="inputValue" placeholder="상품 이름, 브랜드, 카테고리 등 검색">
                    <button type="submit">검색</button>
                </form> -->
                 <!-- form 형식으로 수정해야 함 -->
			    </div>
			    <table id="monthlyStatsTable" class="stats-table">
			        <thead>
			            <tr>
			                <th>상품 이름</th>
			                <th>총 주문 수</th>
			            </tr>
			        </thead>
			        <tbody>
			            <c:forEach var="orderList" items="${orderList}">
			                <tr>
			                    <td>${orderList.proName}</td>
			                    <td>${orderList.totalQuantity}</td>
			                </tr>
			            </c:forEach>
			        </tbody>
			    </table>
			</div>


            <!-- 성별 주문 통계 섹션 -->
            <div id="genderStatsSection" class="hidden">
                <h2>성별 주문 통계</h2>
                <div>
                    <input type="radio" id="all" name="gender" value="all" checked onclick="filterGender()">
                    <label for="all">전체</label>
                    <input type="radio" id="male" name="gender" value="남" onclick="filterGender()">
                    <label for="male">남성</label>
                    <input type="radio" id="female" name="gender" value="여" onclick="filterGender()">
                    <label for="female">여성</label>
                </div>
                <h2>상품별 성별 구매 통계</h2>
                <table id="genderStatsTable" class="stats-table">
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>성별</th>
                            <th>구매 수</th>
                        </tr>
                    </thead>
                    <tbody>
   <%--               <c:forEach var="stats" items="${ }">
                            <tr>
                                <td>${product.pro_name}</td>
                                <td>${user.gender}</td>
                                <td>${oritems.oritem_quan}</td>
                            </tr>
                        </c:forEach> --%>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
