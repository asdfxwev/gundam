package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ImgDTO extends ProductDTO {
	private int img_id;
	private String pro_imgs;
	private int pro_num;
	private String pro_id;
}
