<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert New Product</title>
    <style>
        form {
            margin: 50px;
            width: 400px;
            padding: 20px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
        }
        button {
            padding: 10px 20px;
            background-color: #5cb85c;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #4cae4c;
        }
    </style>
</head>
<body>
    <h1>Insert New Product</h1>

    <form action="${pageContext.request.contextPath}/adminproduct/productInsert" method="post"  enctype="multipart/form-data">
        <label for="pro_name">Product Name:</label>
        <input type="text" id="pro_name" name="pro_name" required>

        <label for="pro_des">Product Description:</label>
        <input type="text" id="pro_des" name="pro_des" required>

        <label for="pro_price">Product Price:</label>
        <input type="number" id="pro_price" name="pro_price" step="1" required>
        
        <label for="pro_stoct">Product Stock:</label>
        <input type="number" id="pro_stock" name="pro_stock" step="1" required>
		
        <label for="pro_cate">Category:</label>
        <!-- 건담/포켓몬 -->
		<select id="pro_cate" name="pro_cate">
				<c:forEach var="codecate" items="${codecate}">
					<option value="${codecate.code_id}"  >${codecate.code_name}</option>
				</c:forEach>
			</select>
		<!-- 브랜드 1/100 -->
        <label for="cate_brand">Brand:</label>
			<select id="cate_brand" name="cate_brand">
				<c:forEach var="codebrand" items="${codebrand}">
					<option value="${codebrand.code_id}" >${codebrand.code_name}</option>
				</c:forEach>
			</select>
		<!-- 카테고리 건담무사 -->
        <label for="cate_piece">Piece:</label>
			<select id="cate_piece" name="cate_piece">
				<c:forEach var="codepiece" items="${codepiece}">
					<option value="${codepiece.code_id}"  >${codepiece.code_name}</option>
				</c:forEach>
			</select>
        <label for="pro_state_cd">state:</label>
			<select id="pro_state_cd" name="pro_state_cd">
				<c:forEach var="codestate" items="${codestate}">
				<option value="${codestate.code_id}"  >${codestate.code_name}</option>
				</c:forEach>
			</select>

		<label for="pro_img">상품대표이미지 :</label>
		<img alt="haha" src="" class="select_img" width="80" height="120">
		<input type="file" name="pros_img" id="pro_img" required>
		
		<label for="pros_imgs">상품 상세이미지들:</label>
        <input type="file" id="pros_imgs" name="pros_imgs" multiple>
        
        		
		<script>
			document.getElementById('pro_img').onchange = function(e) {
				if (this.files && this.files[0]) {
					let reader = new FileReader;
					reader.readAsDataURL(this.files[0]);
					reader.onload = function(e) {
						document.getElementsByClassName('select_img')[0].src = e.target.result;
					} // onload_function
				} // if    
			}; //change
		</script>
		
        <button type="submit">Insert Product</button>
    </form>

</body>
</html>
