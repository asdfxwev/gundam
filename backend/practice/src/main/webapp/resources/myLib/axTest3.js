// Ajax_REST API, Axios Test
// Axios 메서드형식 적용
// 1. List 출력
// - axiMList : MemberController, Page response (axmemberList.jsp)

// 2. 반복문에 이벤트 적용하기
// - idbList(id별 boardList) : RESTController, List_Data response 
// - Delete, TeamDetail
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


"use strict"
// 1. list 출력
// 1.1 page response
// - response를 resultArea1에 출력하면 된다.
// - 요청url : member/aximemberList
// - response : axmemberList.jsp
function axiMList () {
	
	let url = "/member/aximemberList";
	
	axios.get(url)
		 .then(response => {
			document.getElementById("resultArea1").innerHTML = response.data;
		 }).catch(err => {
			alert(`axiMList fail to open because of ${err.message}`);
		 });
		 document.getElementById("resultArea2").innerHTML = "";
	
}

// 2. 반복문에 이벤트 적용하기
// 2.1 idbList(id별 boardList)
// RESTController, PathVariable 처리,  List_Data response 
// Server : service, Sql 구문 작성
// request : id 를 path 로 전송 "/rest/idblist/banana"
// Response 
// - 성공 : 반복분, Table로 List 출력문 완성, resultArea2 에 출력
// - 출력자료의 유/무 : Server 에서 status로 (없으면 502) 처리
// - 실패 : resultArea2 clear, alert 으로 에러메시지 출력 
function idbList(id) {
	
	let url = "/rest/idblist/"+id;
	
	axios.get(url)
		 .then(response => {
			console.log(`idbList 성공 : ${response.data}`);
			let listData = response.data;
			let resultHtml = 
			`
			<table style="width: 100%">
				<tr bgcolor="aquamarine">
					<th>Seq</th>
					<th>Title</th>
					<th>ID</th>
					<th>RegDate</th>
					<th>조회수</th>
				</tr>`
			// 반복문 적용
			// for 간편출력 : of. in
			// in : undefined는 통과하고, 배열(index Return), 객체(속성명 Return)
			// of : undefined까지 모두 출력(순차출력과 동일), value르,ㄹ return
			// 		ES6 에 for ~ in 의 단점을 보완 개선하여 추가됨.
			//		일반 객체에는 적용안되지만, (오류발생, 개발자모드로 확인가능)
			// 		Array, String, Map, Set, function의 매개변수 객체 와
			// 		이터러블 규약을 따르는 이터러블 객체 (Iterable Object) 는 적용됨
			// => 이터러블 규약
			//    내부에 Symbol.iterator (줄여서 @@iterator로 표현하기도함) 메서드가 구현되어 있어야 한다는 규약 
			for(let b of listData) {
				resultHtml += `
				<tr>
					<td>${b.seq}</td>
					<td>${b.title}</td>
					<td>${b.id}</td>
					<td>${b.regdate}</td>
					<td>${b.cnt}</td>
				</tr>
				`;
			}
			resultHtml += `</table>`;
			document.getElementById("resultArea2").innerHTML = resultHtml;
		 }).catch(err => {
			// response의 status가 502면 출력할 자료 없음 
			if(err.response.status == '502') {
				document.getElementById("resultArea2").innerHTML = err.response.data;
			} else {
				document.getElementById("resultArea2").innerHTML = `시스템 오류다 이놈아 ${err.message}`;
			}
		 })
}


// 2.2 axiDelete
// 요청명 : "rest/axidelete", PathVariable로 id 처리
// response로는 성공 / 실패여부 결과만 받으면 됨(그러므로 RESTController 사용)
// 성공 : Deleted로 변경, onclick 해제
function axiDelete(e, id) {
	
	let url = "rest/axidelete/"+id;
	
	axios.delete(url)
		 .then(response => {
			alert(`성공이다 이놈아 => ${response.data}`);
			// 삭제 성공
			// Delete -> Deleted로 변경, color gray로 변경
			// onclick 이벤트 제거
			// style 제거
			/*document.getElementById(id).innerHTML = 'Deleted';*/
			/*document.getElementById(id).style.color = 'aquamarine';*/
			e.target.innerHTML = 'Deleted';
			e.target.style.color = 'aquamarine';
			document.getElementById(id).style.fontWeight = 'bold';
			document.getElementById(id).removeAttribute('onclick');
			document.getElementById(id).classList.remove('textlink');
		 }).catch(err => {
			if(err.response.status == '502') {
				alert(`실패다 이놈아 => ${err.response.data}`);
			} else {
				alert(`너도 실패다 이놈아 => ${err.message}`);
			}
		 })
	
	
	
}


function aximouseover(e, teamno) {
	
	let url = "rest/aximouseover/"+teamno;
	
	let mleft = e.pageX + 150;
	let mtop = e.pageY;
	
	axios.get(url)
		 .then(response => {
		 let resultHtml = `
		 
		 <table>
		 <tr>  
		 <th>teamno </th>
		 <th>teamname </th>
		 <th>captain </th>
		 <th>project </th>
		 <th>slogan </th>
		 </tr>
		 <tr>
		 <td>${response.data.teamno} </td>
		 <td>${response.data.teamname} </td>
		 <td>${response.data.captain} </td>
		 <td>${response.data.project} </td>
		 <td>${response.data.slogan} </td>
		 </tr>
		 </table>
		 `;
			document.getElementById("content").innerHTML = resultHtml;
			document.getElementById("content").style.display="inherit"
			document.getElementById("content").style.top = `${mtop}px`;
			document.getElementById("content").style.left = `${mleft}px`;
		 }).catch(err => {
			alert(`안보인다 이놈아 => ${err.message}`);
		 })
	
}

function aximouseout() {

		document.getElementById("content").style.display="none";

}


// Ajax Member_PageList *********************
// axiMList 에 Paging + 검색기능 추가
// 검색조건 & Paging , Ajax 구현
// - 입력된 값들을 서버로 전송요청: axios
// - url 완성후 axios 호출

// 1) 검색조건 입력 후 버튼클릭
// - jsp  문서내무의 script 구문을 외부문서로 작성 : EL Tag 적용안됨
// - ${pageMaker.makeQuery(1)} -> ?currPage=1&rowsPerPage=5 

function searchDB() {
	// 요청 url 작성 
	let url = 'axmcri' + '?currentPage=1&rowsPerPage=5'
			+ '&searchType=' + document.getElementById("searchType").value
			+ '&keyword=' + document.getElementById("keyword").value;
	
	// axios 요청 처리
	axiMListCri(url);
}

// 2) keywordClear
// searchType 을 all 선택 시 keyword를 clear
function keywordClear() {
	if (document.getElementById("searchType").value == 'all') {
		document.getElementById("keyword").value = '';
	}
}

// 3) axios 요청 처리
// axiMListCri(url)
// 첫 요청 명 : /member/axmcri(axTestForm.jsp에서 온 요청 확인)
// Parameter는 QueryString으로 처리
function axiMListCri(url) {
	url = "/member/"+url;
	console.log(`axiMList url => ${url}`);
	
	axios.get(url)
		 .then(response => {
			document.getElementById('resultArea1').innerHTML = response.data;
		 }).catch(err => {
			document.getElementById('resultArea1').innerHTML = `axiMListCri 요청 실패 : ${err.message}`;
		 });
		 document.getElementById("resultArea2").innerHTML='';
	
}


// 4) Ajax Check 검색기능
// check 검색 submit을 Button(type 속성주의)으로변경
// MemberController : axmcri 메서드 공유
// 단, 조건 구문을 위해 요청명은 "/axmcheck"

// 4.1) CheckClear
function checkClear() {
	let ck = document.querySelectorAll('.clear');
	for (let i = 0; i < ck.length; i++) {
		ck[i].checked = false;
	}
	return false // reset의 기본 이벤트 제거
}

// 4.2) Axios 요청처리
// url : /member/axmCheck?currentPage=1&rowsPerPage=5&check=1&check=2.....
// MemberController 메핑메서드는 axmcri 를 함께 사용
function axiMListCheck() {
	
	let checkAll = document.querySelectorAll('.check');
	
	let checkData = '';
	
	//forEach 적용 : checkAll에 대해 QueryString을 작성을 위함
	checkAll.forEach(check => {
		if(check.checked){
			checkData += "&check="+check.value;
		}
	});
	
	// url 완성 및 요청
	// 요청은 axMListCri() 메서드를 사용하므로 axmCheck부터 시작
	let url = "axmCheck"+"?currentPage=1&rowsPerPage=5"+checkData;
	
	axiMListCri(url);
	
}











