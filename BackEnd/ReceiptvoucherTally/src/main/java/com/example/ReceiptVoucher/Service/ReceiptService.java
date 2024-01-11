package com.example.ReceiptVoucher.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.ReceiptVoucher.Modal.ReceiptModal;
import java.util.Optional;

public interface ReceiptService 
{

    ResponseEntity<String> addReceipt(ReceiptModal receiptModal);

    List<String> addMultipleReceipts(List<ReceiptModal> receiptModals);

    Optional<ReceiptModal> getReceiptById(Long id);

    ReceiptModal updateReceipt(Long id, ReceiptModal updatedReceiptModal);

    String deleteReceipt(Long id);

    List<ReceiptModal> getAllReceipts();

    //public List<ReceiptModal> getReceiptsByUserIdAndCompanyId(long userId, long companyId);

	List<ReceiptModal> getReceiptsByUserIdAndCompanyId(Long userId, Long companyId);
    
}
