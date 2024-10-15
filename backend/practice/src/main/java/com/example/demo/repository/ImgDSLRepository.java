package com.example.demo.repository;

import java.util.List;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Img;

public interface ImgDSLRepository {
	
	List<Img> selectMainList();
	
	List<Img> selectImg(String proId);
	
	List<Img> imgNumOne(String proId);
	
	Img imgNumZero(String proId);
	
	void deleteProId(String proId);
	
	Img findByProImgs(String proImgs, String proId);
	
	ImgDTO selectProduct(String proId);
	
	List<Img> imgList(String proId);
	
	List<Img> orderImgList(List<String> proId);
	
<<<<<<< Updated upstream
	void deleteImage(String pro_id, String pro_imgs);
	
	void updateImage(String pro_imgs, String pro_id, int pro_num);
	
=======
>>>>>>> Stashed changes
}
