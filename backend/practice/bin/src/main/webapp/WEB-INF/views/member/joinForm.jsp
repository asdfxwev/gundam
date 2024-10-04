<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>** Join Form **</title>
	<script src="/resources/myLib/inCheck.js"></script>
	<script>
		"use strict"
	//** 입력값의 무결성 점검
	// ID 중복확인, 무결성 점검
	// 1) 모든항목  focusout 이벤트핸들러
	// - 개별항목 점검확인하는 boolean Type 변수 (스위치변수) 
	// - 개별항목 점검 function() 작성
	// 2) submit 진행전에 점검확인
	// - 모든항목의 점검이 완료된 경우에만  submit 진행
	// - function inCheck() 로 확인
	// - submit 버튼의 onclick 리스너에 등록
	//    ( submit 의 default 이벤트 고려 )
	//--------------------------------------
	// 1) 멤버변수 정의
	let iCheck = false;
	let pCheck = false;
	let p2Check = false;
	let nCheck = false;
	let aCheck = false; // age
	let poCheck = false; // point
	let bCheck = false;
	
	// 2) 개별적인 이벤트 핸들러
	onload = function() {
		// window.onload에서 window는 생략 가능
		// body에 있는 tag들을 인식 가능한 상태에서 실행되도록 하기 위함이다.
		
		// ID
		document.getElementById("id").focus();
		document.getElementById("id").addEventListener('keydown', 
				(e)=> { if(e.which == 13) {
					// form tag 내에서는 enter를 누르면 submit이 발생
					// 그러므로 이 이벤트의 제거가 필요
					e.preventDefault();
					document.getElementById("idDup").focus();
				}
			}
		);
		document.getElementById("id").addEventListener('focusout', 
				() => {
					iCheck = idCheck()
				}
		);
		
		document.getElementById("password").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("password2").focus();
				}
			}
		);
		document.getElementById("password").addEventListener('focusout',
				() => {
					pCheck = passwordCheck()
				}
		);
		
		document.getElementById("password2").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("name").focus();
				}
			}
		);
		document.getElementById("password2").addEventListener('focusout',
				() => {
					p2Check = password2Check()
				}
		);
		
		document.getElementById("name").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("age").focus();
				}
			}
		);
		document.getElementById("name").addEventListener('focusout',
				() => {
					nCheck = nameCheck()
				}
		);
		
		document.getElementById("age").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("teamno").focus();
				}
			}
		);
		document.getElementById("age").addEventListener('focusout',
				() => {
					aCheck = ageCheck()
				}
		);
		
		document.getElementById("teamno").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("info").focus();
				}
			}
		);
/* 		document.getElementById("teamno").addEventListener('focusout',
				() => {
					pCheck = teamnoCheck()
				}
		); */
		
		document.getElementById("info").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("point").focus();
				}
			}
		);
/* 		document.getElementById("info").addEventListener('focusout',
				() => {
					iCheck = infoCheck()
				}
		); */
		
		document.getElementById("point").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("birthday").focus();
				}
			}
		);
		document.getElementById("point").addEventListener('focusout',
				() => {
					poCheck = pointCheck()
				}
		);
		
		document.getElementById("birthday").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("rid").focus();
				}
			}
		);
		document.getElementById("birthday").addEventListener('focusout',
				() => {
					bCheck = birthdayCheck()
				}
		);
		
		document.getElementById("rid").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("uploadfilef").focus();
				}
			}
		);
/* 		document.getElementById("rid").addEventListener('focusout',
				() => {
					pCheck = ridCheck()
				}
		); */
		
		document.getElementById("uploadfilef").addEventListener('keydown', 
				(e) => {if(e.which == 13) {
					e.preventDefault();
					document.getElementById("submitTag").focus();
				}
			}
		);
/* 		document.getElementById("uploadfilef").addEventListener('focusout',
				() => {
					pCheck = passwordCheck()
				}
		); */
		
	}
	
	
	
	
	// 3) submit 실행여부 판단 & 실행
	// 모든 항목에 대한 무결성 확인
	// 오류가 없으면 submit 진행
	// 하나의 오류라도 있으면 submit 진행하지 않아야 한다.
	function incheck() {
		
		if(!iCheck){
			document.getElementById("iMessage").innerHTML = "ID는  필수입력이다 이놈아"
		}
		
		if(!pCheck){
			document.getElementById("pMessage").innerHTML = "비밀번호는  필수입력이다 이놈아"
		}
		
		if(!p2Check){
			document.getElementById("p2Message").innerHTML = "비밀번호확인은  필수입력이다 이놈아"
		}
		
		if(!nCheck){
			document.getElementById("nMessage").innerHTML = "이름는  필수입력이다 이놈아"
		}
		
		if(!aCheck){
			document.getElementById("aMessage").innerHTML = "나이는  필수입력이다 이놈아"
		}
		
		if(!poCheck){
			document.getElementById("poMessage").innerHTML = "포인트는  필수입력이다 이놈아"
		}
		
		if(!bCheck){
			document.getElementById("bMessage").innerHTML = "생년월일은  필수입력이다 이놈아"
		}
		
		if(iCheck && pCheck && p2Check && nCheck && aCheck && poCheck && bCheck ){
			if(confirm("가입할꺼니 이놈아? (yes: 확인 / no : 취소)")){
				return true;
			} else {
				alert("가입이 취소되었습니다.");
				return false;
			}
		} else {
			return false;
		}
	}
	
	
	// id 중복 확인
	// - UI개선사항
	// - 중복확인 버튼 추가
	//   - 처음 : 중복확인버튼 : enable / submit_disable
	//   - 중복확인 완료 후 submit이 가능하도록
	//   - 중복확인버튼 : disable / submit_enable
	//   - 중복확인기능 : function inDupCheck()
	//   - id입력값의 무결성점검 -> id 확인요청 -> 서버로 전송 -> id, selectOne 결과 -> response : 사용가능 / 불가능
	//   - 서버측 : controller에 idDupCheck 요청을 처리하는 매핑메서드, view_page(팝업창) 작성
	function idDupCheck() {
		// id 입력값의 무결성 점검
		if(!iCheck) {
			iCheck = idCheck();
		} else {
			// 서버로 id 확인요청
			let url = "idDupCheck?id="+document.getElementById("id").value
			window.open(url, '_blank', 'width=400, height=300, resizable=yes, scrollerbars=yes, toolbar=no, menubar=yes')
		}
	}
		
	</script>
</head>
<body>
	<h2>** Spring JoinForm **</h2>
	<!-- File Upload 기능추가 -->
	<!--  ** FileUpLoad Form **
=> form 과 table Tag 사용시 주의사항 : form 내부에 table 사용해야함
   -> form 단위작업시 인식안됨
   -> JQ 의 serialize, FormData 의 append all 등 

=> method="Post" : 255 byte 이상 대용량 전송 가능 하므로

=> <form enctype="속성값">
   <form> 태그의 데이터 (input 의 value)가 서버로 제출될때 해당 데이터가 인코딩되는 방법을 명시함.  
 
=> enctype="multipart/form-data" : 화일 upload 를 가능하게 해줌 
    ** multipart/form-data는 파일업로드가 있는 입력양식요소에 사용되는 enctype 속성의 값중 하나이고, 
       multipart는 폼데이터가 여러 부분으로 나뉘어 서버로 전송되는 것을 의미
       이 폼이 제출될 때 이 형식을 서버에 알려주며, 
       multipart/form-data로 지정이 되어 있어야 서버에서 정상적으로 데이터를 처리할 수 있다.     
-->
	<form action="mjoin" method="post" enctype="multipart/form-data" id="myform">
		<table>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="id">I D</label></td>
				<td>
					<input type="text" name="id" id="id" placeholder="영문과 숫자로 4~10글자" size="20"><br>
					<button type="button" id="idDup" onclick="idDupCheck()">ID중복확인</button>
					<span id="iMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="password">Password</label></td>
				<td>
					<input type="password" name="password" id="password"	placeholder="특수문자 필수" size="20"><br>
					<span id="pMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="password2">Password 확인</label></td>
				<td>
					<input type="password" id="password2"	placeholder="비밀번호 재입력" size="20"><br>
					<span id="p2Message" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="name">Name</label></td>
				<td>
					<input type="text" name="name" id="name" size="20"><br>
					<span id="nMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="age">Age</label></td>
				<td><input type="text" name="age" id="age" size="20"><br>
					<span id="aMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="teamno">Teamno</label></td>
				<!-- team table에서 목록 읽어서 표시하고
				MemberController의 joinForm에서 team table에서 selectList 필요 -->
				<td><select name="teamno" id="teamno">
						<c:forEach  var="teamdto" items="${requestScope.teamdto }">
							<option value="${teamdto.teamno}">${teamdto.teamno}조: ${teamdto.teamname }</option>
						</c:forEach>
				</select></td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="info">Info</label></td>
				<td><input type="text" name="info" id="info"	placeholder="자기소개 & 희망사항" size="20"></td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="point">Point</label></td>
				<td>
					<input type="text" name="point" id="point"	placeholder="실수 입력" size="20"><br>
					<span id="poMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="birthday">Birthday</label></td>
				<td>
					<input type="date" name="birthday" id="birthday"><br>
					<span id="bMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="rid">추천인</label></td>
				<td><input type="text" name="rid" id="rid" size="20"></td>
			</tr>
			<tr height="40">
				<td bgcolor="#bcdeff"><label for="uploadfilef">이미지</label></td>
				<td><img alt="myimage" src="" class="select_img" width="80"
					height="100"><br> <input type="file" name="uploadfilef"
					id="uploadfilef" size="20"></td>
				<script>
					document.getElementById('uploadfilef').onchange = function(
							e) {
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
			<tr>
				<td></td>
				<td>
					<input type="submit" value="가입" id="submitTag" onclick="return incheck()" disabled="disabled">&nbsp;&nbsp;
					<!--
					 Tag의 onclick 이벤트를 작성하고, onclick 이벤트 핸들러가 가지고 있던
					기본 동작인 submit을 선택적으로 진행되도록 해준다.
					- submit 진행 : default(또는 return true) 
					- submit 정지 : submit 이벤트를 무효화 해야함(rdturn false 또는 이벤트.preventDefault()) 
					-->
					
					<!--
            		<button onclick="inCheck()">ButtonTest</button>
            		** Button Test
                	=> default : form 내부에서는 submit 와 동일하게 작동됨 
                         inCheck() 의 return 값에 따라 (true 면) submit 진행됨 
                	=> 단, type 속성을 선택하면 (button, reset, submit 등) 속성에 맞게 실행됨
                   예) button 을 선택하면 submit 은 실행되지않음   
                   
            		** Enter_Key : form 내부에서는 누르면 submit이 진행됨.   
            		-->
					<input type="reset" value="취소">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<!-- Axios Join Test -->
					<span class="textlink" onclick="axiJoin()">axiJoin</span>
				</td>
			</tr>
		</table>
	</form>
	<br>
	<hr>
	<c:if test="${!empty requestScope.message}">
=> ${requestScope.message}<br>
	</c:if>
	<hr>
	&nbsp;
	<a href="/home">Home</a>&nbsp; &nbsp;
	<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
</body>
</html>