package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Img;
import com.example.demo.repository.ImgDSLRepository;
import com.example.demo.repository.ImgRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgServiceImpl implements ImgService {
	
	private final ImgRepository irepository;
	private final ImgDSLRepository idslrepository;
	
	@Override
	public Img save(Img imgEntity) {
		return irepository.save(imgEntity);
	}
	@Override
	public List<Img> selectMainList() {
		return idslrepository.selectMainList();
	}
	
	@Override
	public List<Img> selectOne(String proId) {

		return idslrepository.selectImg(proId);
		
	}
	
	@Override
	public List<Img> imgNumOne(String proId) {
		return idslrepository.imgNumOne(proId);
	}
	
	@Override
	public Img imgNumZero(String proId) {
		return idslrepository.imgNumZero(proId);
	}
	
	@Override
	public void deleteProId(String proId) {
		idslrepository.deleteProId(proId);
	}
	
	@Override
	public Img findByProImgs(String proImgs, String proId) {
		return idslrepository.findByProImgs(proImgs, proId);
	}
	
	@Override
	public List<Integer> findAllProNum(String proId) {
		return irepository.findAllProNum(proId);
	}
	
	@Override
	public List<Img> imgList(String proId) {
		return idslrepository.imgList(proId);
	}
	
	@Override
	public ImgDTO selectProduct(String proId) {
		return idslrepository.selectProduct(proId);
	}
	
//	@Override
//    public Img findByPrIomgs(String proImgs, String proId) {
//        return idslrepository.findByPrIomgs(proImgs, proId);
//    }
	
//	@Override
//	public Img findByProNumAndProductId(Integer proNum, String pro_id) {
//		// TODO Auto-generated method stub
//		return irepository.findByProNumAndProductId(proNum, pro_id);
//	}
	
}
