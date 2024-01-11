package com.example.PaymentVoucher.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.PaymentVoucher.Modal.PaymentModal;

public interface PaymentService {

	    ResponseEntity<String> addPayment(PaymentModal Modal);

	    List<String> addMultiplePaymentVouchers(List<PaymentModal> modals);

	    Optional<PaymentModal> getPaymentById(Long paymentNo);

	    PaymentModal updatePayment(Long paymentNo, PaymentModal updatedReceiptModal);

	    String deletePayment(Long paymentNo);

	    List<PaymentModal> getAllPayments();

		List<PaymentModal> getPaymentsByUserIdAndCompanyId(Long userId, Long companyId);
	    
}
