package com.example.demo.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.domain.ImgDTO;
import com.example.demo.entity.Img;
import com.example.demo.repository.ImgDSLRepository;
import com.example.demo.repository.ImgRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
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
	
	@Override
	public void deleteImagesByIds(List<Long> imgId, HttpServletRequest request, String proId) {
		for (Long img : imgId) {
			irepository.deleteById(img);
		}
		
//	    // 파일 삭제
//	    String realPath = request.getServletContext().getRealPath("/") + "resources\\"+proId+"\\";
//	    File dir = new File(realPath);
//	    
//	    
//	    if (dir.exists() && dir.isDirectory()) {
//	        File[] files = dir.listFiles(); // 디렉터리 내의 파일과 디렉터리 목록 가져오기
//
//	        // 파일 및 하위 디렉터리 삭제
//	        if (files != null) {
//	            for (File file : files) {
//	                if (file.isDirectory()) {
//	                    // 하위 디렉터리가 있을 경우 재귀적으로 삭제
//	                    for (File subFile : file.listFiles()) {
//	                        boolean deleted = subFile.delete();
//	                    }
//	                }
//	                boolean deleted = file.delete(); // 파일 삭제
//	            }
//	        }
//
//	        // 최종적으로 디렉터리 삭제
//	        boolean dirDeleted = dir.delete();
//	    } else {
//	        log.info("Directory does not exist or is not a directory.");
//	    }
		
	}
	
	@Transactional
	@Override
	public void deleteImage(List<Map<String, String>> requestData,  HttpServletRequest request) {
		
		List<Map<String, String>> deleteData = (List<Map<String, String>>) requestData.get("deleteData");
        
        // 나머지 이미지 데이터 가져오기
        List<Map<String, String>> remainingImageData = (List<Map<String, String>>) requestData.get("remainingImageData");
		
	    for (Map<String, String> imageData : deleteData) {
	        String pro_imgs = imageData.get("pro_imgs");
	        String pro_id = imageData.get("pro_id");
		    String realPath = request.getServletContext().getRealPath("/") + "resources\\productImg\\"+pro_id+"\\"+pro_imgs;
	        File imageFile = new File(realPath);
	        
	        if (imageFile.exists() && imageFile.isFile()) {
	            // 파일이 존재하고 파일일 경우 삭제
	            boolean deleted = imageFile.delete();
	            if (deleted) {
	                log.info("이미지 파일이 삭제되었습니다: " + pro_imgs);
	            } else {
	                log.error("이미지 파일 삭제 실패: " + pro_imgs);
	            }
	        } else {
	            log.error("파일이 존재하지 않거나 파일이 아닙니다: " + realPath);
	        }


	        // 이미지 삭제 로직 작성
	        idslrepository.deleteImage(pro_id, pro_imgs);
	    }
		
	}
	
}
