package com.example.PaymentVoucher.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.PaymentVoucher.Modal.PaymentModal;
import com.example.PaymentVoucher.Repository.PaymentRepository;

@Service
public class PaymentServiceImplementation implements PaymentService
{
	@Autowired
    private  PaymentRepository repo;

    @Override
    public Optional<PaymentModal> getPaymentById(Long paymentNo) {
        return repo.findById(paymentNo);
    }

    @Override
    public ResponseEntity<String> addPayment(PaymentModal modal) {
//        if (repo.findByParticulars(modal.getParticulars()) != null)
//            return ResponseEntity.badRequest().body("Payment Voucher is already present.");
//
              repo.save(modal);
        return ResponseEntity.ok("Payment Voucher added Successfully");
    }

    @Override
    public List<String> addMultiplePaymentVouchers(List<PaymentModal> modal) {
        List<String> results = new ArrayList<>();
        for (PaymentModal payment : modal) {
            results.add(addPayment(payment).getBody());
        }
        return results;
    }

    @Override
    public String deletePayment(Long paymentNo) {
        repo.deleteById(paymentNo);
        return "Payment Voucher Deleted Successfully ";
    }

    @Override
    public PaymentModal updatePayment(Long paymentNo, PaymentModal update) {
        update.setPaymentNo(paymentNo);
        return repo.save(update);
    }

    @Override
    public List<PaymentModal> getAllPayments() {
        return repo.findAll();
    }

    @Override
    public List<PaymentModal> getPaymentsByUserIdAndCompanyId(Long userId, Long companyId) {
    	return repo.findByUserIdAndCompanyId(userId, companyId);
    }
}