package com.anarghya.erp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anarghya.erp.entity.CompanyForm;

public interface CompanyFormRepository extends JpaRepository<CompanyForm, Long> {

	Optional<CompanyForm> findByCompanyId(Long companyId);

	List<CompanyForm> findByUserId(Long userId);

	CompanyForm findByEmail(String email);
	
	public boolean existsByEmail(String email);

    public boolean existsByMobileNo(Long mobileNo);
		
}
