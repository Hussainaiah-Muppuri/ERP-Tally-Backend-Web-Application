package com.vijayit.service;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

import com.vijayit.entity.CreditEntity;

public interface CreditService {

	public ResponseEntity<String> saveCredit(CreditEntity credit);

	public String update(Long creditNo, CreditEntity updateCredit);

	public List<CreditEntity> saveAll(List<CreditEntity> credits);

	public Optional<CreditEntity> getCreditByCreditNo(Long creditNo);

	public String deleteByCreditNo(Long creditNo);

	List<CreditEntity> getAllByUserIdAndCompanyId(Long userId, Long companyId);

}