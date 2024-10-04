<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>     
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Update Form **</title>
</head>
<body>
<h2>** SpringBoot UpdateForm **</h2>
<form action="mupdate" method="post" enctype="multipart/form-data">
<table>
	<tr height="40">
		<td bgcolor="#b3ffff"><label for="id">I D</label></td>
		<td><input type="text" name="id" id="id" value="${requestScope.memberdto.id}" readonly size="20"></td>
				<!-- id: 화면출력, 서버로 전송, 수정은불가(즉, input Tag 의 입력 막기) 
				 -> readonly: 서버로 전송 (권장)
				 -> disabled: 서버로 전송되지않음
				-->
	</tr>
	<tr height="40">
		<td bgcolor="#a0b4f0"><label for="password">Password</label></td>
		<td><input type="password" name="password" id="password" value="${requestScope.memberdto.password}" readonly size="20"></td>
	</tr>
	<tr height="40">
		<td bgcolor="#a0b4f0"><label for="name">Name</label></td>
		<td><input type="text" name="name" id="name" value="${requestScope.memberdto.name}" size="20"></td>
	</tr>
	<tr height="40">
		<td bgcolor="#a0b4f0"><label for="age">Age</label></td>
		<td><input type="text" name="age" id="age" value="${requestScope.memberdto.age}" size="20"></td>
	</tr>
		<tr height="40">
		<td bgcolor="#a0b4f0"><label for="teamno">Teamno</label></td>
		<td>
		<select name="teamno" id="teamno">
			<c:forEach var="teamdto" items="${requestScope.teamdto}">
				<option value="${teamdto.teamno}" ${memberdto.teamno == teamdto.teamno ? "selected" : ""} >
					${teamdto.teamno}조: ${teamdto.teamname }
				</option>
			</c:forEach>
		</select></td></tr>
	<tr height="40">
		<td bgcolor="#a0b4f0"><label for="info">Info</label></td>
		<td><input type="text" name="info" id="info" value="${requestScope.memberdto.info}" size="20"></td>
	</tr>
	<tr height="40">
		<td bgcolor="#a0b4f0"><label for="point">Point</label></td>
		<td><input type="text" name="point" id="point" value="${requestScope.memberdto.point}" size="20"></td>
	</tr>
	<tr height="40">
		<td bgcolor="#a0b4f0"><label for="birthday">Birthday</label></td>
		<td><input type="date" name="birthday" id="birthday" value="${requestScope.memberdto.birthday}"></td>
	</tr>
		<tr height="40">
		<td bgcolor="#a0b4f0"><label for="rid">추천인</label></td>
		<td><input type="text" name="rid" id="rid" value="${requestScope.memberdto.rid}" size="20"></td>
	</tr>
	
	<!-- 
	file update 기능 추가
	- form tag : method, enctype 확인
	- new image를 선택하는 경우 : uploadfilef 사용
	- new image를 선택하지 않는 경우 : 본래 image 사용 -> updatefile값이 필요함(hidden으로 보관)
	 -->
	
	<tr height="40">
		<td bgcolor="#a0b4f0"><label for="uploadfilef">이미지</label></td>
		<td><img alt="myimage" src="/resources/uploadimages/${requestScope.memberdto.uploadfile}" class="select_img" width="80"height="100">
		<input type="hidden" name = "uploadfile" value="${requestScope.memberdto.uploadfile}">
		<br> 
		<input type="file" name="uploadfilef" id="uploadfilef" size="20"></td>
			<script>
				document.getElementById('uploadfilef').onchange = function(e) {
					if (this.files && this.files[0]) {
						let reader = new FileReader;
						reader.readAsDataURL(this.files[0]);
						reader.onload = function(e) {
							// => jQuery를 사용하지 않는경우 
							document.getElementsByClassName('select_img')[0].src = e.target.result;
								//$(".select_img").attr("src", e.target.result)
							//                .width(70).height(90); 
						} // onload_function
					} // if    
				}; //change
			</script>
	</tr>
	<tr><td></td>
		<td><input type="submit" value="수정">&nbsp;&nbsp;
			<input type="reset" value="취소">
		</td>
	</tr>
</table>
</form>
<br><hr>
<c:if test="${!empty requestScope.message}">
=> ${requestScope.message}<br>
</c:if>
<hr>
&nbsp;<a href="pwUpdate">Password 수정</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
</body>
</html>