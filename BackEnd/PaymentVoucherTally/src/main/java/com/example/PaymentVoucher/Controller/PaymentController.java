package com.example.PaymentVoucher.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.PaymentVoucher.Modal.PaymentModal;
import com.example.PaymentVoucher.Service.PaymentService;

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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PaymentController {
	@Autowired
	private PaymentService service;

	@GetMapping("/payment/{paymentNo}")
	public ResponseEntity<PaymentModal> getPaymentVoucherById(@PathVariable long paymentNo) {
		Optional<PaymentModal> voucher = service.getPaymentById(paymentNo);
		return voucher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/payment/user/{userId}/company/{companyId}")
	public ResponseEntity<List<PaymentModal>> getPaymentVoucherById(@PathVariable long userId,
			@PathVariable long companyId) {
		List<PaymentModal> payment = service.getPaymentsByUserIdAndCompanyId(userId, companyId);
		return payment.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(payment);
	}

	@PostMapping("/payment")
	public ResponseEntity<ResponseEntity<String>> createPaymentVoucher(@RequestBody PaymentModal pojo) {
		ResponseEntity<String> result = service.addPayment(pojo);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/payment/multiple")
	public ResponseEntity<List<String>> addMultiplePayments(@RequestBody List<PaymentModal> pojo) {
		List<String> results = service.addMultiplePaymentVouchers(pojo);
		return ResponseEntity.ok(results);
	}

	@PutMapping("/payment/{paymentNo}")
	public ResponseEntity<PaymentModal> updatePaymentVoucherById(@PathVariable long paymentNo,
			@RequestBody PaymentModal voucher) {
		PaymentModal result = service.updatePayment(paymentNo, voucher);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/payment/{paymentNo}")
	public ResponseEntity<String> deletePaymentById(@PathVariable long paymentNo) {
		String result = service.deletePayment(paymentNo);
		return ResponseEntity.ok(result);
	}
}