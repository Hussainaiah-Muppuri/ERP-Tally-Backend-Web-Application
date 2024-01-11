package com.example.JournalVoucher.Controller;

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

import com.example.JournalVoucher.Pojo.JournalPojo;
import com.example.JournalVoucher.Services.JournalVoucherService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class JournalVoucherController {
	@Autowired
	private JournalVoucherService jService;

	@GetMapping("/journal/{journalNo}")
	public ResponseEntity<JournalPojo> getJournalVoucherById(@PathVariable long journalNo) {
		Optional<JournalPojo> receiptVoucher = jService.getJournalById(journalNo);
		return receiptVoucher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

//		    @GetMapping("/journal/user/{userId}/company/{companyId}")
//		    public ResponseEntity<JournalPojo> getJournaltVoucherById(@PathVariable long userId, @PathVariable long companyId) {
//		        Optional<JournalPojo> journal = jService.getJournalByUserIdAndCompanyId(userId, companyId);
//		        return journal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//		    }

	@GetMapping("/journal/user/{userId}/company/{companyId}")
	public ResponseEntity<List<JournalPojo>> getJournaltVoucherById(@PathVariable long userId,
			@PathVariable long companyId) {
		List<JournalPojo> groups = jService.getJournalVoucherByUserIdAndCompanyId(userId, companyId);
		return groups.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(groups);
	}

	@PostMapping("/journal")
	public ResponseEntity<ResponseEntity<String>> createReceiptVoucher(@RequestBody JournalPojo pojo) {
		ResponseEntity<String> result = jService.addJournal(pojo);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/journal/multiple")
	public ResponseEntity<List<String>> addMultipleReceipts(@RequestBody List<JournalPojo> pojo) {
		List<String> results = jService.addMultipleJournal(pojo);
		return ResponseEntity.ok(results);
	}

	@PutMapping("/journal/{journalNo}")
	public ResponseEntity<JournalPojo> updateReceiptVoucherById(@PathVariable long journalNo,
			@RequestBody JournalPojo updatedReceiptVoucher) {
		JournalPojo result = jService.updateJournal(journalNo, updatedReceiptVoucher);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/journal/{journalNo}")
	public ResponseEntity<String> deleteReceiptById(@PathVariable long journalNo) {
		String result = jService.deleteJournal(journalNo);
		return ResponseEntity.ok(result);
	}
}
