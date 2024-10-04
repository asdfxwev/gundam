package com.example.demo.domain;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TeamDTO extends MemberDTO {

	private int teamno;
	private String teamname;
	private String captain;
	private String project;
	private String slogan;
	
	// 조장이름 출력을 위한 joinList() 구문의 return 값을 위해 추가
	// select 구문과 컬럼 순서 및 Type이 같아야 함
	public TeamDTO(int teamno, String teamname, String captain, String name, String project, String slogan) {
		super.setName(name);
		this.teamno = teamno;
		this.teamname = teamname;
		this.captain = captain;
		this.project = project;
		this.slogan = slogan;
	}
	
	// toString
	@Override
	public String toString() {
		return "TeamDTO [teamno=" + teamno + ", teamname=" + teamname + ", captain=" + captain  
				+", age = "+getAge() + ", id = "+getId() +", name = "+getName() + ", age = " +getAge()+", project=" + project
				+ ", slogan=" + slogan + "]";
	}

}
