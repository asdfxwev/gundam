<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>주문 통계</title>
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
        #productPieChart{
        	width: 70%;
        }
        #productBarChart {
        	width: 70%;
        }
        .chartContainer{
        	display: flex;
        }
    </style>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"> 
	</script>
	<script>
    	window.onload = function() {
        	const endDateInput = document.getElementById('endDate');
	        const startDateInput = document.getElementById('startDate');

        	const today = new Date();
        	const priorDate = new Date();
        	priorDate.setDate(today.getDate() - 30);

    	    const formattedToday = today.toISOString().split('T')[0];
	        const formattedPriorDate = priorDate.toISOString().split('T')[0];

        	endDateInput.value = formattedToday;
        	startDateInput.value = formattedPriorDate;
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
                <li><a href="http://localhost:3000/">홈페이지로 가기</a></li>
                <li><a href="<c:url value='/userList' />">유저 리스트 출력</a></li>
                <li><a href="<c:url value='/adminproduct/productList'/>">상품 등록/수정/삭제</a></li>
                <li><a href="<c:url value='/adminreview/reviewanswer'/>">리뷰답변달기</a></li>
                <li><a href="<c:url value='/statistics/statisticsList'/>">통계</a></li>
            </ul>
        </div>

        <div class="content">


            <!-- 월별 주문 통계 섹션 -->
			<div id="monthlyStatsSection" class="">

			    <h2>주문 통계</h2>	
			    <div>
					<form action="/statistics/statisticsList" method="POST">
	<!-- 				<input type="radio" id="all" name="gender" value="all" checked>
                    <label for="all">전체</label>
                    <input type="radio" id="male" name="gender" value="남" >
                    <label for="male">남성</label>
                    <input type="radio" id="female" name="gender" value="여" >
                    <label for="female">여성</label>
                    <br> -->
						<c:forEach items="${codecate}" var="codecate">
    						<label><input name="pro_cate" type="checkbox" value="${codecate.code_id}"
        						<c:if test="${selectedProCate != null and selectedProCate.contains(codecate.code_id)}">checked</c:if>
    						>${codecate.code_name}</label>
						</c:forEach>
						<br>
						<c:forEach var="codebrand" items="${codebrand}">
    						<label><input name="cate_brand" type="checkbox" value="${codebrand.code_id}"
        						<c:if test="${selectedBrand != null and selectedBrand.contains(codebrand.code_id)}">checked</c:if>
    						>${codebrand.code_name}</label>
						</c:forEach>
						<br>
						<c:forEach var="codepiece" items="${codepiece}">
    						<label><input name="cate_piece" type="checkbox" value="${codepiece.code_id}"
        						<c:if test="${selectedPiece != null and selectedPiece.contains(codepiece.code_id)}">checked</c:if>
    						>${codepiece.code_name}</label>
						</c:forEach>

						<br>
						<!-- 날짜 필드 유지 -->
						<label for="startDate">시작 날짜:</label>
						<input type="date" id="startDate" name="startDate" value="${startDate}">

						<label for="endDate">종료 날짜:</label>
						<input type="date" id="endDate" name="endDate" value="${endDate}">
    
					    <button type="submit">검색</button>
					</form>
			    </div>
			    <hr>
			    <div class="chartContainer">
				<canvas id="productPieChart"></canvas>
				<hr>
				<canvas id="productBarChart" width="1000%"></canvas>
				</div>
			</div>
			
			<script>
    // JSP 데이터를 JavaScript 변수로 변환
    var productNames = []; // 제품 이름 배열
    var productQuantities = []; // 제품 개수 배열
    <c:forEach var="orderList" items="${orderList}">
    var productName = '${orderList.proName}';
    var productQuantity = ${orderList.totalQuantity};
    
    // productNames 배열에 같은 이름의 제품이 있는지 확인
    var existingIndex = productNames.indexOf(productName);

    if (existingIndex !== -1) {
        // 이미 있는 제품이면, 해당 인덱스에 quantity를 더함
        productQuantities[existingIndex] += productQuantity;
    } else {
        // 없는 제품이면, 새로 추가
        productNames.push(productName);
        productQuantities.push(productQuantity);
    }
    </c:forEach>
    console.log(productNames);

    // Chart.js로 원그래프 그리기
    var ctx = document.getElementById('productPieChart').getContext('2d');
    var productPieChart = new Chart(ctx, {
        type: 'pie', // 차트 종류: 원형
        data: {
            labels: productNames, // 제품 이름들
            datasets: [{
                label: '제품별 개수',
                data: productQuantities, // 제품 개수들
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false, // 반응형 설정
            plugins: {
                legend: {
                    position: 'bottom', // 범례 위치
                },
                tooltip: {
                    enabled: true // 툴팁 활성화
                }
            }
        }
    });
</script>
                <script>
    // JSP 데이터를 JavaScript 변수로 변환 (성별에 따른 구매 데이터 분리)
    var productNames = [];  // 제품 이름 배열
    var maleQuantities = []; // 남성 구매량 배열
    var femaleQuantities = []; // 여성 구매량 배열

    <c:forEach var="orderList" items="${orderList}">
        if (productNames.indexOf('${orderList.proName}') === -1) {
            productNames.push('${orderList.proName}');
            maleQuantities.push(0);  // 초기값 설정
            femaleQuantities.push(0);  // 초기값 설정
        }

        var index = productNames.indexOf('${orderList.proName}');
        if ('${orderList.gender}' == '1' || '${orderList.gender}' == '3') {
            maleQuantities[index] = ${orderList.totalQuantity}; // 남성 구매량 추가
        } else if ('${orderList.gender}' == '2' || '${orderList.gender}' == '4') {
            femaleQuantities[index] = ${orderList.totalQuantity}; // 여성 구매량 추가
        }
    </c:forEach>
	console.log(productNames);
    
    // Chart.js로 성별 구매 통계를 막대그래프로 그리기
    var ctx = document.getElementById('productBarChart').getContext('2d');
    var productGenderChart = new Chart(ctx, {
        type: 'bar', // 차트 종류: 막대그래프
        data: {
            labels: productNames, // 제품 이름들
            datasets: [
                {
                    label: '남성 구매량',
                    data: maleQuantities, // 남성 구매량
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // 파란색
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: '여성 구매량',
                    data: femaleQuantities, // 여성 구매량
                    backgroundColor: 'rgba(255, 99, 132, 0.6)', // 빨간색
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: false, // 반응형 설정
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom', // 범례 위치
                },
                tooltip: {
                    enabled: true // 툴팁 활성화
                }
            }
        }
    });
</script>
            </div>
        </div>
</body>
</html>
