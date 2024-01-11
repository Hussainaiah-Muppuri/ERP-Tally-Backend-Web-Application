package com.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.entity.SignUpEntity;

public interface SignUpRepo extends JpaRepository<SignUpEntity, Integer> {
	
	public SignUpEntity findByEmailAndPassword(String email, String password);
	public SignUpEntity findByMobileNumberAndPassword(String mobile, String password);
	
	public boolean existsByEmail(String email);
	
	public SignUpEntity findByEmail(String email);

}
