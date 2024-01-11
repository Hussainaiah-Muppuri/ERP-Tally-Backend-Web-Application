package com.vochure.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vochure.entity.VochureEntity;
import com.vochure.service.VochureService;

@CrossOrigin("*")
@RequestMapping("/api/sales")
@RestController
public class VochureContrloller {
	@Autowired
	private VochureService vochureService;

	@PostMapping("/save")
	public ResponseEntity<ResponseEntity<String>> saveVochure(@RequestBody VochureEntity vochure) {
		ResponseEntity<String> result = vochureService.saveVochure(vochure);
		return ResponseEntity.ok(result);
	}

	@PutMapping("/update/{saleNo}")
	public ResponseEntity<VochureEntity> update(@PathVariable Long saleNo, @RequestBody VochureEntity updateVochure) {
		VochureEntity result = vochureService.update(saleNo, updateVochure);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/saveall")
	public ResponseEntity<List<VochureEntity>> saveAll(@RequestBody List<VochureEntity> vochures) {
		List<VochureEntity> results = vochureService.saveAll(vochures);
		return ResponseEntity.ok(results);
	}

	@GetMapping("/get/{saleNo}")
	public ResponseEntity<VochureEntity> getVochureById(@PathVariable Long saleNo) {
		Optional<VochureEntity> result = vochureService.getVochureById(saleNo);
		return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/delete/{saleNo}")
	public ResponseEntity<String> deleteBySaleNo(@PathVariable Long saleNo) {
		String result = vochureService.deleteBySaleNo(saleNo);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/getAllBy/{userId}/{companyId}")
	public ResponseEntity<List<VochureEntity>> getAllVochuresByUserIdAndCompanyId(@PathVariable Long userId,
			@PathVariable Long companyId) {
		List<VochureEntity> result = vochureService.getAllVochuresByUserIdAndCompanyId(userId, companyId);
		return ResponseEntity.ok(result);
	}

}