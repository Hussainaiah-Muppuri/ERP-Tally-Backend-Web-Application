package com.anarghya.erp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anarghya.erp.entity.UnitEntity;

@Repository
public interface UnitRepository extends JpaRepository<UnitEntity, Long> {
	
	  List<UnitEntity> findByUserIdAndCompanyId(Long userId, Long companyId);
}
