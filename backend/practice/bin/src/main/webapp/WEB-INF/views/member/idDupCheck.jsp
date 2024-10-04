<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>idDupChek</title>
<script src="/resources/myLib/inCheck.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css" >
<script>
	/* idOk : 사용자가 입력한 id를 사용하능하도록 해주고, 현재(this) 창은 close
	- this 창의 id를 부모창의 id로
	- 부모창의 ID중복확인 버튼은 disabled & submit은 enable
	- 부모창의 id는 수정불가(readonly), password에 focus
	- 현재(this) 창은 close */
	function idOk() {
		
		// 현재창의 id를 부모창의 id로 옮기기
		opener.document.getElementById("id").value =  "${param.id}";
																								// EL 활용: JSP문서 내부의 script구문의 문자열 내부의 EL은 처리해줌 
																								//window.document.getElementById("id").value
		
		// 부모창의  submit은 enable
		opener.document.getElementById("submitTag").disabled = '';
		
		// 부모창의 id는 수정불가(readonly), password에 focus
		// => readonly 속성 사용시 주의
    	//    Tag 의 속성은 readonly로 정의되어 있지만, ( readonly="readonly" )
    	//    DOM 의 node 객체에서는 readOnly 로 정의되어있으므로
    	//    JS 코딩시에는 readOnly 로 사용해야함
    	//opener.document.getElementById('id').readonly="readonly"; //XXX
    	//opener.document.getElementById('id').readOnly="readOnly"; //OK
    	//opener.document.getElementById('id').readOnly = true; //OK
		opener.document.getElementById("id").readOnly='readOnly';
    	opener.document.getElementById("password").focus();
    	
    	// 현재창은 close
		close();
    	// window.close() or self.close()
		
	}
</script>
</head>
<body>
	<div id="wrap">
		<h3>ID 중복 확인하기</h3>
		<form action="idDupCheck" method="get">
			User_ID 입력 : 
			<input type="text" name="id" id="id" value="${param.id}">
			<input type="submit" value="ID 중복 확인" onclick="return idCheck()"> <br>
			<span id="iMessage" class="eMessage"></span>
		</form>
		<!-- 서버처리결과 : idUse의 값 T/F에 따른 메시지 출력 -->
		<div id="msgBlock">
			<c:if test="${idUse == 'T'}">${param.id } 사용가능 &nbsp;&nbsp; <button onclick="idOk()">ID 선택</button></c:if>
			<c:if test="${idUse == 'F'}">${param.id } 사용불가능  <br> 다시 입력해라 이놈아 <br>
				<!-- 부모창에 남아있는 id 삭제, 현재 창의 id에 focus를 지정해서 재입력 유도 -> script 필요 -->
				<script>
					window.document.getElementById("id").focus();
					opener.document.getElementById("id").value="";
				</script>
			</c:if>
		</div>
		<script>
					opener.document.getElementById("idDup").disabled = 'disabled';
		
		</script>
	</div>
</body>
</html>