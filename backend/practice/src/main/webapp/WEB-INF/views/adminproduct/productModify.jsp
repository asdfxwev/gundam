 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Product Modify</title>
<style>
/* 그리드 컨테이너 설정 */
.admingrid-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr); 
	gap: 10px;
	background-color: #f2f2f2;
	padding: 10px;
}
.admingrid-containers {
	display: grid;
	grid-template-columns: repeat(1, 1fr); 
	gap: 10px;
	background-color: #f2f2f2;
	padding: 10px;
}

/* 그리드 항목 설정 */
.admingrid-item {
	background-color: white;
	border: 1px solid #ddd;
	padding: 8px;
	text-align: center;
	font-size: 14px;
}

/* 제목을 위한 스타일 */
.admingrid-header {
	font-weight: bold;
	background-color: #333;
	color: white;
}

/* 전체 그리드 컨테이너 스타일 */
.admingrid-wrapper {
	margin: 20px auto;
	width: 95%;
	max-width: 1200px;
	display: flex;
	flex-direction: column; /* 세로 방향으로 정렬 */
	align-items: center; /* 중앙 정렬 */
}

/* 양쪽 그리드 항목을 가로로 배치 */
.admingrid-inner {
    display: flex;
    width: 100%; /* 전체 너비 사용 */
}

/* 수정, 삭제 버튼 스타일 */
.productModifyFlex {
    margin-top: 20px; /* 버튼 상단 여백 */
    display: flex; /* 버튼들을 가로로 배치 */
    justify-content: center; /* 버튼 중앙 정렬 */
}

.productModifyFlex button,
.productModifyFlex a {
    padding: 10px 20px;
    margin: 0 10px;
    color: white;
    background-color: #3498db; /* 버튼 색상 */
    border: none;
    border-radius: 5px;
    text-decoration: none; /* 링크의 기본 스타일 제거 */
    cursor: pointer;
}

.productModifyFlex a {
    display: inline-block; /* 링크를 버튼처럼 보이게 설정 */
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
#deleteImg{
	cursor: pointer;
}

.img-group {
	display: flex;
}

.img-group div:nth-child(1) {
    width: 150px; /* 원하는 크기 설정 */
}
  	/* 두 번째 항목 (이미지) */
.img-group div:nth-child(2) {
    width: 150px; /* 이미지 너비 설정 */
    text-align: center;
    padding: 10px;
}

   /* 세 번째 항목 (이미지 숫자) */
.img-group div:nth-child(3) {
    width: 250px; /* 셀렉트 박스 크기 설정 */
    text-align: center;
    padding: 10px;
}

.img-groups {
	display: flex;
}

.img-groups div:nth-child(1) {
    width: 150px; /* 원하는 크기 설정 */
}
  	/* 두 번째 항목 (이미지) */
.img-groups div:nth-child(2) {
    width: 150px; /* 이미지 너비 설정 */
    text-align: center;
    padding: 10px;
}

   /* 세 번째 항목 (이미지 숫자) */
.img-groups div:nth-child(3) {
    width: 250px; /* 셀렉트 박스 크기 설정 */
    text-align: center;
    padding: 10px;
}

.selectList select{
	width: 70%;
}

</style>
</head>
<body>

<form action="${pageContext.request.contextPath}/adminproduct/productModify?proId=${productSelectOne.pro_id}" method="post" enctype="multipart/form-data">
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
        <div class="admingrid-wrapper">
            <div class="admingrid-inner">
                <div class="admingrid-container">
                    <div class="admingrid-item admingrid-header">상품이름</div>
                    <input value="${productSelectOne.pro_name}" type="text" name="pro_name">
                    <div class="admingrid-item admingrid-header">상품상세정보</div>
                    <input value="${productSelectOne.pro_des}" type="text" name="pro_des">
                    <div class="admingrid-item admingrid-header">가격</div>
                    <input value="${productSelectOne.pro_price}" type="number" name="pro_price">
                    <div class="admingrid-item admingrid-header">재고</div>
                    <input value="${productSelectOne.pro_stock}" type="number" name="pro_stock">
                    <div class="admingrid-item admingrid-header">카테고리</div>
                    <select name="pro_cate">
                        <c:forEach var="codecate" items="${codecate}">
                            <option value="${codecate.code_id}" 
                                <c:if test="${productSelectOne.pro_cate == codecate.code_name}">
                                    selected="selected"
                                </c:if>
                            >${codecate.code_name}</option>
                        </c:forEach>
                    </select>
                    <div class="admingrid-item admingrid-header">브랜드</div>
                    <select name="cate_brand">
                        <c:forEach var="codebrand" items="${codebrand}">
                            <option value="${codebrand.code_id}" 
                                <c:if test="${productSelectOne.cate_brand == codebrand.code_name}">
                                    selected="selected"
                                </c:if>
                            >${codebrand.code_name}</option>
                        </c:forEach>
                    </select>
                    <div class="admingrid-item admingrid-header">piece</div>
                    <select name="cate_piece">
                        <c:forEach var="codepiece" items="${codepiece}">
                            <option value="${codepiece.code_id}"
                                <c:if test="${productSelectOne.cate_piece == codepiece.code_name}">
                                    selected="selected"
                                </c:if>
                            >${codepiece.code_name}</option>
                        </c:forEach>
                    </select>
                    <div class="admingrid-item admingrid-header">품절유무</div>
                    <select name="pro_state_cd">
                        <c:forEach var="codestate" items="${codestate}">
                            <option value="${codestate.code_id}" 
                                <c:if test="${productSelectOne.pro_state_cd == codestate.code_name}">
                                    selected="selected"
                                </c:if>
                            >${codestate.code_name}</option>
                        </c:forEach>
                    </select>
                </div>
                
                <div class="admingrid-containers"> 
                	<div class="img-groups">
                    	<div>이미지이름</div>
                    	<div>이미지</div>
                    	<div>이미지 숫자(0이 대표이미지, 나머지 상세이미지)</div>
                    </div>
                    <c:forEach var="imgall" items="${imgall}" varStatus="status">
                    <div class="img-group">
                    	<div class="grid-item">
	                        <label><input type="checkbox" name="img_id" value="${imgall.pro_num}">${imgall.pro_imgs}</label>
                    	</div>
                    	<div class="imgList">
                        	<img width="70" height="70" src="/resources/productImg/${productSelectOne.pro_id}/${imgall.pro_imgs}" alt="이미지" />
                    	</div>
                    	<div class="selectList">
                        	<select name="pro_nums" id="select_${status.index}" onchange="selectChange(this, ${status.index})">
                            	<c:forEach var="imgnum" items="${imgnum}">
                                	<option value="${imgnum.pro_num}"
                                    	<c:if test="${imgall.pro_num == imgnum.pro_num}"> selected="selected"</c:if>
                                	>${imgnum.pro_num}</option>
                            	</c:forEach>
                        	</select>
                    	</div>
                    <!-- Hidden input to track the file name of the image -->
                    	<input type="hidden" name="pro_imgs_list" value="${imgall.pro_imgs}" />
                    	<input type="hidden" name="pro_num" value="${imgall.pro_num}" />
                	</div>
                    </c:forEach>
                    <div class="img-groups">
					<div class="delete-image">
                       <a id="deleteImg" onclick="submitDeleteForm()">선택한 이미지 삭제</a>
                    </div>
                    <label for="pro_imgs">상품 상세이미지추가:</label>
                    <input type="file" id="pros_imgs" name="pros_imgs" multiple>
                    </div>
                    
                </div>
            </div>

            <script>
                function selectChange(selectElement, currentIndex) {
                    const selectedValue = selectElement.value; 
                    const allSelects = document.querySelectorAll('select[name="pro_nums"]'); 

                    allSelects.forEach((select, index) => {
                        if (index !== currentIndex && select.value === selectedValue) {
                            select.value = ''; 
                        }
                    });
                }
                                
/*                 function submitDeleteForm() {
                    const checkboxes = document.querySelectorAll('input[name="img_id"]:checked');
                    console.log(checkboxes.length);
                    if (checkboxes.length === 0) {
                        alert('삭제할 이미지를 선택하세요.');
                        return;
                    }

                    const confirmDelete = confirm('선택한 이미지를 삭제하시겠습니까?');
                    if (!confirmDelete) return;

                    // 선택된 이미지의 pro_imgs와 pro_id 값 추출
                    const deleteData = [];
                    checkboxes.forEach(checkbox => {
                        const imgGroup = checkbox.closest('.img-group');
                        const pro_imgs = imgGroup.querySelector('input[name="pro_imgs_list"]').value;
                        const pro_id = '${productSelectOne.pro_id}';  // pro_id는 JSP에서 받아온 값을 사용

                        deleteData.push({ pro_imgs, pro_id });
                    });

                    const remainingImageData = []; // 삭제된 이미지를 제외한 나머지 이미지 데이터
                    const allImgGroups = document.querySelectorAll('.img-group');
                    allImgGroups.forEach(imgGroup => {
                        const pro_imgs = imgGroup.querySelector('input[name="pro_imgs_list"]').value;
                        const pro_id = '${productSelectOne.pro_id}'; // 동일한 pro_id 사용
                        const pro_num = imgGroup.querySelector('input[name="pro_num"]').value;

                        // 삭제할 이미지와 비교하여 제외
                        if (!deleteData.some(data => data.pro_imgs === pro_imgs)) {
                            remainingImageData.push({ pro_imgs, pro_id,  pro_num });
                        }
                    });

                    // AJAX 요청으로 데이터를 백엔드에 전송
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "${pageContext.request.contextPath}/adminproduct/deleteImage", true); // 서버에 전송할 URL 설정
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            alert('이미지가 성공적으로 삭제되었습니다.');
                            window.location.reload(); // 성공 시 페이지 새로고침
                        } else {
                            alert('이미지 삭제에 실패했습니다.');
                        }
                    };

                    const requestData = {
                        deleteData,
                        remainingImageData // 삭제된 이미지를 제외한 데이터
                    };

                    xhr.send(JSON.stringify(requestData)); // requestData를 JSON 형태로 전송
                } */
                
                function submitDeleteForm() {
                    const checkboxes = document.querySelectorAll('input[name="img_id"]:checked');
                    console.log(checkboxes.length);
                    if (checkboxes.length === 0) {
                        alert('삭제할 이미지를 선택하세요.');
                        return;
                    }

                    const confirmDelete = confirm('선택한 이미지를 삭제하시겠습니까?');
                    if (!confirmDelete) return;

                    // 선택된 이미지의 pro_imgs와 pro_id 값 추출
                    const deleteData = [];
                    checkboxes.forEach(checkbox => {
                        const imgGroup = checkbox.closest('.img-group');
                        const pro_imgs = imgGroup.querySelector('input[name="pro_imgs_list"]').value;
                        const pro_id = '${productSelectOne.pro_id}';  // pro_id는 JSP에서 받아온 값을 사용

                        deleteData.push({ pro_imgs, pro_id });
                    });

                    const remainingImageData = []; // 삭제된 이미지를 제외한 나머지 이미지 데이터
                    const allImgGroups = document.querySelectorAll('.img-group');
                    allImgGroups.forEach(imgGroup => {
                    	console.log("gd1");
                        const pro_imgs = imgGroup.querySelector('input[name="pro_imgs_list"]').value;
                    	console.log("gd2");
                        const pro_id = '${productSelectOne.pro_id}'; // 동일한 pro_id 사용
                    	console.log("gd3");
                        const pro_num = imgGroup.querySelector('input[name="pro_num"]').value; // 수정된 부분: pro_num을 올바르게 가져옴

                        // 삭제할 이미지와 비교하여 제외
                        if (!deleteData.some(data => data.pro_imgs === pro_imgs)) {
                            remainingImageData.push({ pro_imgs, pro_id, pro_num }); // pro_num 추가
                        }
                    });

                    // AJAX 요청으로 데이터를 백엔드에 전송
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "${pageContext.request.contextPath}/adminproduct/deleteImage", true); // 서버에 전송할 URL 설정
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            alert('이미지가 성공적으로 삭제되었습니다.');
                            window.location.reload(); // 성공 시 페이지 새로고침
                        } else {
                            alert('이미지가 성공적으로 삭제되었습니다.');
                        	window.location.reload(); // 성공 시 페이지 새로고침
                        }
                    };

                    const requestData = {
                        deleteData,
                        remainingImageData // 삭제된 이미지를 제외한 데이터
                    };

                    xhr.send(JSON.stringify(requestData)); // requestData를 JSON 형태로 전송
                }




            </script>
            
            <!-- 수정 및 삭제 버튼을 admingrid-wrapper 안에 중앙에 위치 -->
            <div class="productModifyFlex">
                <button type="submit">수정</button>
                <a href="/adminproduct/productDelete?proId=${productSelectOne.pro_id}" onclick="return confirm('정말로 삭제하시겠습니까?');">
                    <button type="button">삭제</button>
                </a>
            </div>
        </div>
    </div>
</form>

</body>
</html>
 