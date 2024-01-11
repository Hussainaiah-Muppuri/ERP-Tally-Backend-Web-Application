package com.vijayit.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vijayit.entity.CreditEntity;

public interface CreditRepository extends JpaRepository<CreditEntity, Long> {

	public Optional<CreditEntity> findByCreditNo(Long creditNo);

	public boolean existsByCreditNo(Long creditNo);

	public List<CreditEntity> findAllByUserIdAndCompanyId(Long userId, Long companyId);
}
