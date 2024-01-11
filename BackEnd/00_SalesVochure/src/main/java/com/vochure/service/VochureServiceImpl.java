package com.vochure.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.vochure.entity.VochureEntity;
import com.vochure.repo.VochureRepository;

@Service
public class VochureServiceImpl implements VochureService {

	@Autowired
	private VochureRepository vochureRepo;

	@Override
	public ResponseEntity<String> saveVochure(VochureEntity vochure) {
		vochureRepo.save(vochure);
		return ResponseEntity.ok("saved successfully");
	}

	@Override
	public VochureEntity update(Long saleNo, VochureEntity updateVochure) {
		updateVochure.setSaleNo(saleNo);
		return vochureRepo.save(updateVochure);
	}

	@Override
	public List<VochureEntity> saveAll(List<VochureEntity> vochures) {
		return vochureRepo.saveAll(vochures);
	}

	@Override
	public Optional<VochureEntity> getVochureById(Long saleNo) {
		return vochureRepo.findBySaleNo(saleNo);
	}

	@Override
	public String deleteBySaleNo(Long saleNo) {
		if (vochureRepo.existsBySaleNo(saleNo)) {
			vochureRepo.deleteById(saleNo);
			return "Delete Success";
		} else {
			return "No Record Found";
		}
	}

	@Override
	public List<VochureEntity> getAllVochuresByUserIdAndCompanyId(Long userId, Long companyId) {
		return vochureRepo.findByUserIdAndCompanyId(userId, companyId);
	}

}