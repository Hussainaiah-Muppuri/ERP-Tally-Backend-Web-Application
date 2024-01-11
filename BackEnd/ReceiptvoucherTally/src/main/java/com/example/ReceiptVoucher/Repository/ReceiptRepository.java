package com.example.ReceiptVoucher.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.ReceiptVoucher.Modal.ReceiptModal;

@Repository
public interface ReceiptRepository extends JpaRepository<ReceiptModal, Long>
{   
    Optional<List<ReceiptModal>> findByParticulars(String particulars);
    
    List<ReceiptModal> findByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);
	 
}