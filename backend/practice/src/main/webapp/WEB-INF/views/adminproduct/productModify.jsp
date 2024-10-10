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
	grid-template-columns: repeat(3, 1fr); 
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
}

.productModifyFlex {
    display: flex;
    width: 100%; /* 전체 너비 사용 */
    justify-content: center; /* 중앙 정렬 */
    text-align: center;
    colspan: 2;
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
</style>
</head>
<body>

<form action="${pageContext.request.contextPath}/adminproduct/productModify?proId=${productSelectOne.pro_id}" method="post"  enctype="multipart/form-data">
    <div class="container">
        <div class="sidebar">
            <h2>관리자 페이지</h2>
            <ul>
                <li><a href="<c:url value='/userList' />">유저 리스트 출력</a></li>
                <li><a href="productList">상품 등록/수정/삭제</a></li>
                <li><a href="">코드테이블 등록/수정/삭제</a></li>
            </ul>
        </div>
	<div class="admingrid-wrapper">
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
			<select  name="cate_piece">
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
    <div> 이미지이름</div>
    <div>이미지</div>
    <div>이미지 숫자(0이 대표이미지, 나머지 상세이미지)</div>
    <c:forEach var="imgall" items="${imgall}" varStatus="status">
        <div class="grid-item grid-header">${imgall.pro_imgs}</div>
        <img  width="50" height="50" src="/resources/productImg/${productSelectOne.pro_id}/${imgall.pro_imgs}" alt="이미지" />
        
        <!-- Select box to choose image number -->
        <select name="pro_nums" id="select_${status.index}" onchange="selectChange(this, ${status.index})" >
            <c:forEach var="imgnum" items="${imgnum}">
                <option value="${imgnum.pro_num}"
                    <c:if test="${imgall.pro_num == imgnum.pro_num}"> selected="selected"</c:if>
                >${imgnum.pro_num}</option>
            </c:forEach>
        </select>
        
        <!-- Hidden input to track the file name of the image -->
        <input type="hidden" name="pro_imgs_list" id="pros_img_${status.index}" value="${imgall.pro_imgs}" />
    </c:forEach>

		<label for="pro_imgs">상품 상세이미지추가:</label>
        <input type="file" id="pros_imgs" name="pros_imgs" multiple>
        
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
		</script>
		
	</div>
		<div class="productModifyFlex">
			<div ><button type="submit">수정</button></div>
			<div ><a href="/product/productDelete?proId=${productSelectOne.pro_id}" onclick="return confirm('정말로 삭제하시겠습니까?');">삭제</a></div>
		</div>
    </form>

</body>
</html>