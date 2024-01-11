package com.ledger.controller;

import java.util.ArrayList;
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

import com.ledger.entity.LedgerEntity;
import com.ledger.service.LedgerService;

@CrossOrigin("*")
@RestController
@RequestMapping("/ledger")
public class LedgerController {
	
	@Autowired
	private LedgerService ledgerService;

	
	@PostMapping("/save")
	public ResponseEntity<String> saveLedger(@RequestBody LedgerEntity ledger) {
	    if (ledgerService.isLedgerNameAndUnderGroupAlreadyExist(ledger)) {
	        return ResponseEntity.badRequest().body("Ledger with the Same Name and Under Same Group is already Exists");
	    }

	    ResponseEntity<String> result = ledgerService.saveLedger(ledger);
	    return ResponseEntity.ok(result.getBody());
	}

	@PutMapping("/update/{ledgerId}")
	public ResponseEntity<LedgerEntity> update(@PathVariable Long ledgerId, @RequestBody LedgerEntity updateLedger) {
		LedgerEntity result = ledgerService.update(ledgerId, updateLedger);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/saveall")
	public ResponseEntity<List<LedgerEntity>> saveAll(@RequestBody List<LedgerEntity> ledgers) {
	    List<LedgerEntity> results = new ArrayList<>();

	    for (LedgerEntity ledger : ledgers) {
	        if (ledgerService.isLedgerNameAndUnderGroupAlreadyExist(ledger.getLedgerName(), ledger.getUnderGroup())) {
	             return ResponseEntity.status(HttpStatus.CONFLICT).body(results);
	        }
	        List<LedgerEntity> results12 = ledgerService.saveAll(ledgers);
	        results.addAll(results12);
	    }
	    return ResponseEntity.ok(results);
	}

	@GetMapping("/get/{ledgerId}")
	public ResponseEntity<LedgerEntity> getLedgerById(@PathVariable Long ledgerId) {
		Optional<LedgerEntity> result = ledgerService.getLedgerById(ledgerId);
		return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/delete/{ledgerId}")
	public ResponseEntity<String> deleteByLedgerId(@PathVariable Long ledgerId) {
		String result = ledgerService.deleteByLedgerId(ledgerId);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/getall/{userId}/{companyId}")
	public ResponseEntity<List<LedgerEntity>> getAllLedgersByUserIdAndCompanyId(@PathVariable Long userId,
			@PathVariable Long companyId) {
		List<LedgerEntity> result = ledgerService.getAllLedgersByUserIdAndCompanyId(userId, companyId);
		return ResponseEntity.ok(result);
	}
}