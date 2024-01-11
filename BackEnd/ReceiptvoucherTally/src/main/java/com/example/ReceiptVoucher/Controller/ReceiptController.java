package com.example.ReceiptVoucher.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ReceiptVoucher.Modal.ReceiptModal;
import com.example.ReceiptVoucher.Service.ReceiptService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ReceiptController {
	@Autowired
	private ReceiptService receiptService;

	@GetMapping("/receipt/{receiptNo}")
	public ResponseEntity<ReceiptModal> getReceiptVoucherById(@PathVariable long receiptNo) {
		Optional<ReceiptModal> receiptVoucher = receiptService.getReceiptById(receiptNo);
		return receiptVoucher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

//	    @GetMapping("/receipt/user/{userId}/company/{companyId}")
//	    public ResponseEntity<ReceiptModal> getReceiptVoucherById(@PathVariable long userId, @PathVariable long companyId) {
//	        Optional<ReceiptModal> receiptVoucher = receiptService.getReceiptByUserIdAndCompanyId(userId, companyId);
//	        return receiptVoucher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//	    }
	@GetMapping("/receipt/user/{userId}/company/{companyId}")
	public ResponseEntity<List<ReceiptModal>> getGroupById(@PathVariable long userId, @PathVariable long companyId) {
		List<ReceiptModal> groups = receiptService.getReceiptsByUserIdAndCompanyId(userId, companyId);
		return groups.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(groups);
	}

	@PostMapping("/receipt")
	public ResponseEntity<ResponseEntity<String>> createReceiptVoucher(@RequestBody ReceiptModal receiptModal) {
		ResponseEntity<String> result = receiptService.addReceipt(receiptModal);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/receipt/multiple")
	public ResponseEntity<List<String>> addMultipleReceipts(@RequestBody List<ReceiptModal> receiptModals) {
		List<String> results = receiptService.addMultipleReceipts(receiptModals);
		return ResponseEntity.ok(results);
	}

	@PutMapping("/receipt/{receiptNo}")
	public ResponseEntity<ReceiptModal> updateReceiptVoucherById(@PathVariable long receiptNo,
			@RequestBody ReceiptModal updatedReceiptVoucher) {
		ReceiptModal result = receiptService.updateReceipt(receiptNo, updatedReceiptVoucher);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/receipt/{receiptNo}")
	public ResponseEntity<String> deleteReceiptById(@PathVariable long receiptNo) {
		String result = receiptService.deleteReceipt(receiptNo);
		return ResponseEntity.ok(result);
	}
}