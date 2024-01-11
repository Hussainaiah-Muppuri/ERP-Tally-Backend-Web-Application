package com.vijayit.controller;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.vijayit.entity.CreditEntity;
import com.vijayit.service.CreditService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/creditNote")
public class CreditController {
	@Autowired
	private CreditService creditService;

	@PostMapping("/save")
	public ResponseEntity<ResponseEntity<String>> saveCredit(@RequestBody CreditEntity credit) {
		ResponseEntity<String> result = creditService.saveCredit(credit);
		return ResponseEntity.ok(result);
	}

	@PutMapping("/update/{creditNo}")
	public ResponseEntity<String> update(@PathVariable Long creditNo, @RequestBody CreditEntity updateCredit) {
		String result = creditService.update(creditNo, updateCredit);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/saveall")
	public ResponseEntity<List<CreditEntity>> saveAll(@RequestBody List<CreditEntity> credits) {
		List<CreditEntity> results = creditService.saveAll(credits);
		return ResponseEntity.ok(results);
	}

	@GetMapping("/get/{creditNo}")
	public ResponseEntity<CreditEntity> getCreditByCreditNo(@PathVariable Long creditNo) {
		Optional<CreditEntity> result = creditService.getCreditByCreditNo(creditNo);
		return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/delete/{creditNo}")
	public ResponseEntity<String> deleteByCreditNo(@PathVariable Long creditNo) {
		String result = creditService.deleteByCreditNo(creditNo);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/getAllBy/{userId}/{companyId}")
	public ResponseEntity<List<CreditEntity>> getAllByUserIdAndCompanyId(@PathVariable Long userId,
			@PathVariable Long companyId) {
		List<CreditEntity> result = creditService.getAllByUserIdAndCompanyId(userId, companyId);
		return ResponseEntity.ok(result);
	}

}
