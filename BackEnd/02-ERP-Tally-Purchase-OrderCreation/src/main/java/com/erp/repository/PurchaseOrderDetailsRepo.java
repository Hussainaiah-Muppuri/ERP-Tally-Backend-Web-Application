package com.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.entity.PurchaseOrderDetailsEntity;

import java.util.*;

public interface PurchaseOrderDetailsRepo extends JpaRepository<PurchaseOrderDetailsEntity, Integer> {

	List<PurchaseOrderDetailsEntity> findByUserIdAndCompanyId(Long userId, Long companyId);
}
