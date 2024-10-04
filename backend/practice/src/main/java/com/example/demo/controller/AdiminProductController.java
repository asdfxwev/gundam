package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entity.Img;
import com.example.demo.entity.Product;
import com.example.demo.service.CodeService;
import com.example.demo.service.ImgService;
import com.example.demo.service.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/adminproduct")
public class AdiminProductController {

	private final ProductService pservice;
	private final ImgService iservice;
	private final CodeService coservice;
	private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 ss초");

	@GetMapping("/productList")
	public void productList(Model model) {
		// List<Product> list = pservice.selectList();
		model.addAttribute("productJoinList", pservice.joinDSL());
	}

	@GetMapping("/productInsert")
	public void productInsert(Model model) {
		model.addAttribute("codebrand", coservice.codeBrandOne());
		model.addAttribute("codecate", coservice.codeCateOne());
		model.addAttribute("codepiece", coservice.codePieceOne());
		model.addAttribute("codestate",coservice.codeStateOne());
	}

	@GetMapping("productJoinList")
	public void productJoinList(Model model) {
		model.addAttribute("productJoinList", pservice.joinDSL());
	}

	@PostMapping("/productInsert")
	public String productInsert(HttpServletRequest request, Model model, Product productEntity, Img imgEntity,
			@RequestParam("pros_imgs") List<MultipartFile> prosImgs) throws IOException {
		
		// p.k 설정
		List<String> proIds = pservice.findAllProIds();
		// log.info("asdf"+proIds);// asdf[PO00000001, PO00000002, PO00000003,
		// PO00000004, PO00000005, PO00000006]
		String proIdsString = proIds.stream().map(id -> id.substring(2)) // 각 항목에서 "PO" 두 글자를 제거
				.map(Integer::parseInt) // 문자열을 int로 변환
				.max(Comparator.naturalOrder()) // 최대값 찾기
				.map(String::valueOf) // int 값을 다시 String으로 변환
				.orElse("NoData"); // 값이 없을 때 처리

		if (proIdsString != "NoData") {

			int nextId = Integer.parseInt(proIdsString) + 1;

			String formattedId = String.format("%08d", nextId);

			productEntity.setPro_id("PO" + formattedId);
			// imgEntity.setPro_id(productEntity.getPro_id());

		} else {

			productEntity.setPro_id("PO" + String.format("%08d", '1'));
			// imgEntity.setPro_id(productEntity.getPro_id());
			
		}
		
		// 날짜 타입 string으로 바꾸기
        LocalDateTime currentTime = LocalDateTime.now();

        String formattedDateTime = currentTime.format(formatter);
        
        productEntity.setPro_creat(formattedDateTime);
		

        // 이미지 파일 경로
		String realPath = request.getServletContext().getRealPath("/");
		
		
		realPath += "resources\\"+productEntity.getPro_id()+"\\";

		File file = new File(realPath);
		System.out.println(file.getPath());
		if (!file.exists()) {
			file.mkdir();
		}

		String file1 = "", file2 = "aaa.gif";

		MultipartFile proImg = imgEntity.getPros_img();

		// 업로드 파일 선택여부 확인
		if (proImg != null && !proImg.isEmpty()) {
			// imageFile 선택 : 저장
			file1 = realPath + proImg.getOriginalFilename(); // 저장경로 (realPath + 파일명) 완성
			proImg.transferTo(new File(file1)); // file1 경로에 저장(붙여넣기)

			// table 저장값 완성
			file2 = proImg.getOriginalFilename();
			
		}
		
		
		//prosImgs = imgEntity.getPros_imgs();
		try {
			pservice.save(productEntity);
			imgEntity.setPro_id(productEntity);
			imgEntity.setPro_imgs(file2);
			imgEntity.setPro_num(0);
			iservice.save(imgEntity);
			System.out.println(productEntity.getPro_id());
			realPath = request.getServletContext().getRealPath("/") + "resources\\productImg\\"+productEntity.getPro_id()+"\\";
			File files = new File(realPath);
			if (!files.exists()) {
				files.mkdir();
			}
			
			
			if (prosImgs != null && !prosImgs.isEmpty()) {
				int imageNumber = 1; 
				for (MultipartFile img : prosImgs) {
					if (img != null && !img.isEmpty()) {
						String imgFileName = realPath + img.getOriginalFilename();
						img.transferTo(new File(imgFileName));
						
						
						/*
						계속 업데이트 되어 새롭게 엔터티 생성 후 
						imgEntity.setPro_id(productEntity);
						imgEntity.setPro_imgs(img.getOriginalFilename());
						imgEntity.setPro_num(imageNumber);
						iservice.save(imgEntity);
						*/
	                    Img newImgEntity = new Img();
	                    newImgEntity.setPro_id(productEntity);  // Foreign key 설정
	                    newImgEntity.setPro_imgs(img.getOriginalFilename()); // 이미지 파일 이름 설정
	                    newImgEntity.setPro_num(imageNumber);  // 이미지 번호 설정

	                    // 새로운 객체 저장 (Insert)
	                    iservice.save(newImgEntity);
						
						
						imageNumber++;
					}
				}
			}
			
			// product_name duplicate 검사
			return "redirect:/product/productList";

		} catch (Exception e) {
			log.info("errorMessage : " + e.getMessage());
			return "redirect:/product/productInsert";
		}

	}
	
	
	@GetMapping("/productModify")
	public void productModify(Product productEntity, Model model, @RequestParam(value = "proId") String proId) {
		model.addAttribute("productSelectOne", pservice.selectOne(proId));
		model.addAttribute("codebrand", coservice.codeBrandOne());
		model.addAttribute("codecate", coservice.codeCateOne());
		model.addAttribute("codepiece", coservice.codePieceOne());
		model.addAttribute("codestate",coservice.codeStateOne());
		model.addAttribute("imgall", iservice.selectOne(proId));
		model.addAttribute("imgnum",iservice.imgNumOne(proId));
		//model.addAttribute("imgnumzero",iservice.imgNumZero(proId));
	}
	
	@PostMapping("productModify")
	public String productModify(
			Product productEntity, Img imgEntity, 
			@RequestParam("pro_imgs_list") List<String> proImgsList,
			@RequestParam("pros_imgs") List<MultipartFile> prosImgs,
	        @RequestParam("proId") String proId, 
	        @RequestParam("pro_nums") List<Integer> proNums, // Accept the selected image numbers
	        HttpServletRequest request) {
		log.info("Received proId: " + proId);
        LocalDateTime currentTime = LocalDateTime.now();

        String formattedDateTime = currentTime.format(formatter);
        
        productEntity.setPro_creat(formattedDateTime);
        
		productEntity.setPro_id(proId);
        /*
        pservice.save(productEntity);
         */
        //iservice.save(imgEntity);
        
		
	    try {
	        // Save product entity
	        pservice.save(productEntity);
	        
	        if (proNums != null && !proNums.isEmpty() && proImgsList != null && !proImgsList.isEmpty()) {
	            for (int i = 0; i < proNums.size(); i++) {
	                // proNums와 proImgsList가 매칭되는지 확인
	                String proImgsName = proImgsList.get(i);
	                int proNum = proNums.get(i);
	                // 이미지 엔티티를 조회하고 해당 번호를 수정
	                Img updateImg = iservice.findByProImgs(proImgsName, productEntity.getPro_id());
	                if (updateImg != null) {
	                    updateImg.setPro_num(proNum);  // 번호 설정
	                    iservice.save(updateImg); // 업데이트 저장
	                }
	            }
	        }
	        
	        
	        // 추가이미지 
			String realPath = request.getServletContext().getRealPath("/") + "resources\\productImg\\"+productEntity.getPro_id()+"\\";
			File files = new File(realPath);
			if (!files.exists()) {
				files.mkdir();
			}
			
	        if (prosImgs != null && !prosImgs.isEmpty() && proNums != null && !proNums.isEmpty()) {
				for (MultipartFile img : prosImgs) {
					System.out.println("11");
					System.out.println("proId = "+proId);
					System.out.println("iservice.findAllProNum(proId) = "+iservice.findAllProNum(proId));
					List<Integer> proNum = iservice.findAllProNum(proId);
					System.out.println("22");
					int proNumber = proNum.stream()
							.max(Comparator.naturalOrder())
							.orElse(0);
					System.out.println("33");
					proNumber++;
					if (img != null && !img.isEmpty()) {
						String imgFileName = realPath + img.getOriginalFilename();
						img.transferTo(new File(imgFileName));

	                    Img newImgEntitys = new Img();
	                    newImgEntitys.setPro_id(productEntity);  // Foreign key 설정
	                    newImgEntitys.setPro_imgs(img.getOriginalFilename()); // 이미지 파일 이름 설정
	                    newImgEntitys.setPro_num(proNumber);  // 이미지 번호 설정

	                    // 새로운 객체 저장 (Insert)
	                    iservice.save(newImgEntitys);
						
						
					}
				}
			}
	        
	        
	        
	    }catch (Exception e) {
	        log.info("errorMessage : " + e.getMessage());
	        return "redirect:/product/productModify";
	    }
		
		
		return "redirect:/product/productList";
		
	}

	@PostMapping("/productDelete")
	public String productDelete(@RequestParam(value = "proId") String proId, HttpServletRequest request) {
		// 이미지 삭제
	    iservice.deleteProId(proId);
	    // 상품 삭제
	    pservice.deleteById(proId);
	    
	    
	    // 파일 삭제
	    String realPath = request.getServletContext().getRealPath("/") + "resources\\"+proId+"\\";
	    File dir = new File(realPath);
	    
	    
	    if (dir.exists() && dir.isDirectory()) {
	        File[] files = dir.listFiles(); // 디렉터리 내의 파일과 디렉터리 목록 가져오기

	        // 파일 및 하위 디렉터리 삭제
	        if (files != null) {
	            for (File file : files) {
	                if (file.isDirectory()) {
	                    // 하위 디렉터리가 있을 경우 재귀적으로 삭제
	                    for (File subFile : file.listFiles()) {
	                        boolean deleted = subFile.delete();
	                    }
	                }
	                boolean deleted = file.delete(); // 파일 삭제
	            }
	        }

	        // 최종적으로 디렉터리 삭제
	        boolean dirDeleted = dir.delete();
	    } else {
	        log.info("Directory does not exist or is not a directory.");
	    }
	    
	    return "redirect:/product/productList";
	}
	
	
	
}
