package com.example.JournalVoucher.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.JournalVoucher.Pojo.JournalPojo;

@Repository
public interface JournalVoucherRepository extends JpaRepository<JournalPojo, Long>
{
	 Optional<List<JournalPojo>> findByParticulars(String particulars);
	    
	 List<JournalPojo> findByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);
	 
}
