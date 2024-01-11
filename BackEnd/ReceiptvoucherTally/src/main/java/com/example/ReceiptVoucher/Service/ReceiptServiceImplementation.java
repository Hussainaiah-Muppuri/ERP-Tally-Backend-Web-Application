package com.example.ReceiptVoucher.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ReceiptVoucher.Modal.ReceiptModal;
import com.example.ReceiptVoucher.Repository.ReceiptRepository;

@Service
public class ReceiptServiceImplementation implements ReceiptService {

    @Autowired
    private ReceiptRepository receiptrepo;

    @Override
    public Optional<ReceiptModal> getReceiptById(Long receiptNo) {
        return receiptrepo.findById(receiptNo);
    }

    @Override
    public ResponseEntity<String> addReceipt(ReceiptModal receipt) {
//        if (receiptrepo.findByParticulars(receipt.getParticulars()) != null)
//            return ResponseEntity.badRequest().body("Receipt Voucher is already present.");
//
        receiptrepo.save(receipt);
        return ResponseEntity.ok("Receipt Voucher added Successfully");
    }

    @Override
    public List<String> addMultipleReceipts(List<ReceiptModal> receiptModals) {
        List<String> results = new ArrayList<>();
        for (ReceiptModal receiptModal : receiptModals) {
            results.add(addReceipt(receiptModal).getBody());
        }
        return results;
    }

    @Override
    public String deleteReceipt(Long receiptNo) {
        receiptrepo.deleteById(receiptNo);
        return "Deleted Successfully ";
    }

    @Override
    public ReceiptModal updateReceipt(Long receiptNo, ReceiptModal updatedReceipt) {
        updatedReceipt.setReceiptNo(receiptNo);
        return receiptrepo.save(updatedReceipt);
    }

    @Override
    public List<ReceiptModal> getAllReceipts() {
        return receiptrepo.findAll();
    }

    @Override
    public List<ReceiptModal> getReceiptsByUserIdAndCompanyId(Long userId, Long companyId) {
    	return receiptrepo.findByUserIdAndCompanyId(userId, companyId);
    }
 }