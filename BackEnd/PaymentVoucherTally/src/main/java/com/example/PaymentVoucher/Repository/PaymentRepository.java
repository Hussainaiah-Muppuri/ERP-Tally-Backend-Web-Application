package com.example.PaymentVoucher.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.PaymentVoucher.Modal.PaymentModal;

public interface PaymentRepository extends JpaRepository<PaymentModal, Long>{

	 Optional<List<PaymentModal>> findByParticulars(String particulars);
	    
	    List<PaymentModal> findByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);
		 

}
