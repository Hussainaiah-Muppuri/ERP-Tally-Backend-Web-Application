package com.vochure.service;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

import com.vochure.entity.VochureEntity;
public interface VochureService {
	 
	 public  ResponseEntity<String> saveVochure(VochureEntity vochure);
	    
	 public  VochureEntity update(Long saleNo, VochureEntity updateVochure);

	 public  List<VochureEntity> saveAll(List<VochureEntity> vochures);

	 public  Optional<VochureEntity> getVochureById(Long saleNo);

	 public  String deleteBySaleNo(Long saleNo);

	List<VochureEntity> getAllVochuresByUserIdAndCompanyId(Long userId, Long companyId);

}